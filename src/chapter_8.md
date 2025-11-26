# Chapter 8. Smart Contracts and Vyper

Vyper is a well-established contract-oriented programming language for the EVM that strives to provide superior auditability by making it easier for developers to produce intelligible code. In fact, one of the principles of Vyper is to make it virtually impossible for developers to write misleading code.

In this chapter, we will look at common problems with smart contracts, introduce the Vyper contract programming language, and compare it to Solidity, demonstrating the differences.

## Vulnerabilities and Vyper

In 2023 alone, almost $2 billion were stolen because of smart contract vulnerabilities in the Ethereum ecosystem. Vulnerabilities are introduced into smart contracts via code. It can be strongly argued that these and other vulnerabilities are not introduced intentionally, but regardless, undesirable smart contract code evidently results in the unexpected loss of funds for Ethereum users, and this is not ideal. Vyper is designed to make it easier to write secure code or, equally, to make it more difficult to accidentally write misleading or vulnerable code.

## Comparison to Solidity

One of the ways in which Vyper tries to make unsafe code harder to write is by deliberately omitting some of Solidity’s features. This design choice reflects Vyper’s roots in security-first principles and its inspiration from Python’s clarity and simplicity. It is important for those who are considering developing smart contracts in Vyper to understand what features Vyper does not have and why. In this section, we will explore those features and provide justification for why they have been omitted.

Despite stripping down the feature set to reduce ambiguity, Vyper has evolved to meet the practical needs of developers and auditors. For example, the original philosophy of keeping contracts in a single file helped maximize auditability, but it eventually became a bottleneck as protocols grew larger and more complex. To address this, modern Vyper introduced a sophisticated module system that allows developers to split contracts into multiple files while maintaining strict control over state access and code reuse. This module system follows composition principles rather than traditional inheritance, striking a better balance between structure and readability. Vyper has found a growing role in high-assurance use cases such as decentralized finance (DeFi) protocols and staking systems, where developers place a strong emphasis on clarity and ease of auditing.

### Modifiers

As we saw in Chapter 7, in Solidity you can write a function using modifiers. For example, the following function, `changeOwner`, will run the code in a modifier called `onlyBy` as part of its execution:

```solidity
function changeOwner(address _newOwner)
 public
 onlyBy(owner)
{
 owner = _newOwner;
}
```

This modifier enforces a rule in relation to ownership. As you can see, this particular modifier acts as a mechanism to perform a precheck on behalf of the `changeOwner` function:

```solidity
modifier onlyBy(address _account)
{
 require(msg.sender == _account);
 _;
}
```

But modifiers are not just there to perform checks, as shown here. In fact, as modifiers, they can significantly change a smart contract’s environment, in the context of the calling function. Put simply, modifiers are *pervasive*.

Let’s look at another Solidity-style example:

```solidity
enum Stages {
 SafeStage,
 DangerStage,
 FinalStage
}
uint public creationTime = block.timestamp;
Stages public stage = Stages.SafeStage;
function nextStage() internal {
 stage = Stages(uint256(stage) + 1);
}
modifier stageTimeConfirmation() {
 if (stage == Stages.SafeStage &&
 block.timestamp >= creationTime + 10 days)
 nextStage();
 _;
}
function a()
 public
 stageTimeConfirmation
 // More code goes here
{
}
```

On the one hand, developers should always check any other code that their own code is calling. However, it is possible that in certain situations (such as when there are time constraints or exhaustion results in lack of concentration), a developer may overlook a single line of code. This is even more likely if the developer has to jump around inside a large file while mentally keeping track of the function call hierarchy and committing the state of smart contract variables to memory.

Let’s look at the preceding example in a bit more depth. Imagine that a developer is writing a public function called `a`. The developer is new to this contract and is utilizing a modifier written by someone else. At a glance, it appears that the `stageTimeConfirmation` modifier is simply performing some checks regarding the age of the contract in relation to the calling function. What the developer may *not* realize is that the modifier is also calling another function, `nextStage`. In this simplistic demonstration scenario, simply calling the public function `a` results in the smart contract’s `stage` variable moving from `SafeStage` to `DangerStage`.

Vyper has done away with modifiers altogether. The recommendations from Vyper are as follows: if you are only performing assertions with modifiers, then simply use inline checks and asserts as part of the function; if you are modifying smart contract state and so forth, again make these changes explicitly part of the function. Doing this improves auditability and readability since the reader doesn’t have to mentally (or manually) “wrap” the modifier code around the function to see what it does.

### Class Inheritance

Inheritance allows programmers to harness the power of prewritten code by acquiring preexisting functionality, properties, and behaviors from existing software libraries. Inheritance is powerful and promotes the reuse of code. Solidity supports multiple inheritance as well as polymorphism, but while these are key features of object-oriented programming, Vyper does not support them. Vyper maintains that the implementation of inheritance requires coders and auditors to jump between multiple files in order to understand what the program is doing. Vyper also takes the view that multiple inheritance can make code too complicated to understand—a view tacitly admitted by the [Solidity documentation](https://oreil.ly/bkGwS), which gives an example of how multiple inheritance can be problematic.

### Inline Assembly

Inline assembly gives developers low-level access to the EVM, allowing Solidity programs to perform operations by directly accessing EVM instructions. For example, the following assembly code adds 3 to memory location `0x80`:

```
3 0x80 mload add 0x80 mstore
```

This would prevent the ability to search for a variable name to locate all occurrences where the variable is read or modified. Vyper considers the loss of readability to be too high a price to pay for the extra power and thus does not support inline assembly.

### Function Overloading

Function overloading allows developers to write multiple functions of the same name. Which function is used on a given occasion depends on the types of the arguments supplied. Take the following two functions, for example:

```solidity
function f(uint256 _in) public pure returns (uint256 out) {
 out = 1;
}
function f(uint256 _in, bytes32 _key) public pure returns (uint256 out) {
 out = 2;
}
```

The first function (named `f`) accepts an input argument of type `uint256`; the second function (also named `f`) accepts two arguments, one of type `uint256` and one of type `bytes32`. Having multiple function definitions with the same name taking different arguments can be confusing, so Vyper does not support function overloading.

### Variable Typecasting

Vyper takes a very different approach to type conversion compared to Solidity, prioritizing explicit and safe type handling over convenience. The language requires all type conversions to be made explicitly using the built-in `convert()` function, which ensures that developers are always aware of when and how data types are being modified.

We can think of type conversions in two categories: those that might lose information and those that don’t. Vyper’s `convert()` function handles both cases, but always with explicit bounds checking to prevent unexpected behavior. For example, when converting from a larger integer type to a smaller one, Vyper will revert the transaction if the value doesn’t fit within the bounds of the target type.

The syntax for type conversion in Vyper is straightforward:

```
# Converting between integer types
small_value: uint8 = 42
large_value: uint256 = convert(small_value, uint256)  # Safe upcast
back_to_small: uint8 = convert(large_value, uint8)   # Bounds-checked downcast
```

This explicit approach means that while Vyper code may be more verbose than Solidity when dealing with type conversions, it’s also much safer. There’s no possibility of accidentally truncating values or having unexpected overflow behavior because every conversion must be intentional and explicit. The `convert()` function will revert the transaction if the conversion would result in data loss or if the input value is outside the valid range for the target type.

## Decorators

The following decorators may be used at the start of each function:

**@internal**

The `@internal` decorator makes the function inaccessible from outside the contract. This is the default function visibility, and as such, it is optional.

**@external**

The `@external` decorator makes the function both visible and executable publicly. For example, even the Ethereum wallet will display such functions when viewing the contract.

**@view**

Functions with the `@view` decorator are not allowed to change state variables. In fact, the compiler will reject the entire program (with an appropriate error) if the function tries to change a state variable.

**@pure**

Functions with the `@pure` decorator are not allowed to read any blockchain state or make a call to nonpure methods or to other contracts.

**@payable**

Only functions with the `@payable` decorator are allowed to transfer value.

**@deploy**

The `@deploy` decorator is used to mark the constructor function of a contract. This function runs exactly once when the contract is deployed to the blockchain, typically for setting up initial state variables and configuration. In Vyper, only the `__init__()` function can be marked with `@deploy`, and this decorator is required if you want to include constructor logic in your contract.

**@raw_return**

Functions with the `@raw_return` decorator return raw bytes without applying ABI encoding. This decorator is particularly useful in proxy contracts and helper contracts where you need to forward the exact output of another contract call without wrapping it in another layer of encoding. However, there are important limitations: this decorator can be used only on `@external` functions. It cannot be used in interface definitions, and when calling such functions from other contracts, you should use `raw_call` instead of interface calls since the return data may not be ABI encoded.

**@nonreentrant**

The `@nonreentrant` decorator places a lock on a function, preventing reentrant calls to any function covered by the decorator. The reentrancy lock ensures that such functions cannot be entered again until they have finished executing. This decorator is used to prevent reentrancy attacks, where an external contract might call back into the protected functions, potentially causing unexpected behavior or contract exploits. Vyper also supports a pragma for nonreentrancy by default, making all external functions nonreentrant unless explicitly overridden. For example, if contract A uses this decorator for reentrancy protection and makes an external call to contract B, any attempt by contract B to call back into a protected function on contract A will cause the transaction to revert.

> **Note**
>
> This nonreentrant feature in Vyper versions 0.2.15, 0.2.16, and 0.3.0 contained a critical bug that was discovered and exploited to attack the Curve protocol in mid-2023. We will dive deeper into the reentrancy vulnerability in Chapter 9.

Vyper implements the logic of decorators explicitly. For example, the Vyper compilation process will fail if a function has both a `@payable` decorator and a `@view` decorator. This makes sense because a function that transfers value has by definition updated the state so cannot be `@view`. Each Vyper function must be decorated with either `@external` or `@internal` (but not both!).

## Function and Variable Ordering

Vyper’s approach to scoping and declarations follows C99 scoping rules, which provide more flexibility than you might initially expect. While Vyper contracts must still be contained within a single file (unless you are using the module system), the strict ordering requirements that were present in earlier versions have been relaxed for module-scope declarations.

Variables and functions that are declared at the module scope (outside of any function body) are visible throughout the entire contract, even before their formal declaration. This means you can reference state variables and call functions before they appear in the file, similar to how many modern programming languages handle forward declarations.

Here’s a practical example showing how scoping works in modern Vyper:

```
# This function can reference the state variable below
@external
def get_stored_value() -> uint256:
    return self.stored_data  # References variable declared later
# This function can call the function above
@external
def check_if_positive() -> bool:
    return self.get_stored_value() > 0
# State variable declaration - accessible by functions above
stored_data: public(uint256)
```

However, within function scope, Vyper still maintains strict ordering rules. Local variables must be declared before use, and you cannot shadow the names of constants, immutable variables, or other module-level declarations with local variables. This scoping approach strikes a balance between Python’s flexibility and the needs of smart contract development, where clear visibility of state variables and function relationships is important for security auditing.

## Compilation

The easiest way to experiment with Vyper is to use the [Remix online compiler](https://remix.ethereum.org), which allows you to write and then compile your smart contracts using only your web browser (you will need to activate the vyper-remix plug-in in the plug-in manager).

> **Note**
>
> Vyper comes with [built-in common interfaces](https://oreil.ly/GazPW), such as ERC-20 and ERC-721, allowing interaction with such contracts out of the box. Contracts in Vyper must be declared as global variables. An example of declaring an ERC-20 variable is as follows:
> `from vyper.interfaces import ERC20` `token: ERC20`

You can also compile a contract using the command line. Each Vyper contract is saved in a file with the *.vy* extension. Once Vyper is installed, you can compile a contract by running the following command:

```bash
vyper ~/hello_world.vy
```

The compiler offers extensive output options. To get the human-readable ABI description in JSON format, use:

```bash
vyper -f abi ~/hello_world.vy
```

For development and testing, you’ll likely want additional outputs like bytecode, opcodes, or interface files. The compiler supports numerous output formats:

```bash
vyper -f abi,bytecode,interface,source_map ~/hello_world.vy
```

Modern Vyper also includes advanced optimization modes. You can optimize for gas efficiency with `--optimize gas` (the default) or for smaller contract sizes with `--optimize codesize`. The newer, experimental Venom IR pipeline can be enabled with `--experimental-codegen` for even better optimizations.

While Remix and the command-line compiler are excellent for learning and experimentation, developers working on larger projects typically need comprehensive development frameworks. [ApeWorx](https://oreil.ly/AJRSa) (formerly Ape) provides excellent Vyper support with features like automated testing, deployment scripting, and integration with various networks. [Foundry](https://oreil.ly/CWIKj), while primarily focused on Solidity, also supports Vyper development and offers powerful testing and simulation capabilities. These frameworks provide the kind of mature development environment that professional smart contract developers need for building complex applications.

## Protecting Against Overflow Errors at the Compiler Level

Overflow errors in software can be catastrophic when dealing with real value. For example, one [transaction from mid-April 2018](https://oreil.ly/zOy06) shows the malicious transfer of more than 57,896,044,618,658,100,000,000,000,000,000,000,000,000, 000,000,000,000,000,000 BEC tokens. This transaction was the result of an integer-overflow issue in Beauty Chain’s ERC-20 token contract (*BecToken.sol*).

One of the core features of Vyper has always been its built-in overflow protection, which mitigates the risk of the overflow errors that have historically plagued smart contract development. Vyper’s approach to overflow protection is comprehensive: it includes SafeMath-equivalent protection that handles the necessary exception cases for integer arithmetic, ensuring that operations like addition, subtraction, multiplication, and division are safe by default and throwing exceptions when an overflow or underflow occurs. Additionally, Vyper uses clamps to enforce value limits whenever a literal constant is loaded, a value is passed to a function, or a variable is assigned.

It’s worth noting that recent versions of Solidity (0.8.0 and later) have also integrated native overflow checks at the compiler level, similar to what Vyper has provided from the beginning. This means that arithmetic operations in modern Solidity now automatically include overflow checks, significantly reducing the risk of overflow errors without requiring additional libraries like SafeMath. While this change has brought Solidity closer to Vyper’s safety-first approach, Vyper’s implementation remains more comprehensive, including the clamp operations and more consistent bounds checking throughout the language. The key difference is philosophical: Vyper was designed from the ground up with overflow protection as a core principle, while Solidity added it as an enhancement to address historical vulnerabilities. This difference in approach reflects Vyper’s broader commitment to making unsafe code harder to write by default.

## Reading and Writing Data

Even though it is costly to store, read, and modify data, these storage operations are a necessary component of most smart contracts. Smart contracts can write data to two places:

**Global state**

The state variables in a given smart contract are stored in Ethereum’s global state trie; a smart contract can only store, read, and modify data in relation to that particular contract’s address (i.e., smart contracts cannot directly read or write to other smart contracts).

**Logs**

A smart contract can write to Ethereum’s chain data through log events. In Vyper, the syntax for declaring and using events is clean and straightforward, aligning with Vyper’s focus on code clarity.

Event declarations in Vyper look similar to struct declarations. For example, the declaration of an event called `MyLog` is written as:

```
event MyLog:
    arg1: indexed(address)
    arg2: uint256
    message: indexed(bytes[100])
```

You can have up to four indexed arguments (these become searchable topics) and any number of nonindexed arguments that become part of the event data. Indexed arguments are useful for filtering and searching events, while nonindexed arguments can contain larger amounts of data.

The execution of the log event uses the `log` statement with straightforward syntax:

```
log MyLog(msg.sender, 42, b"Hello, Vyper!")
```

You can also create events with no arguments using the `pass` statement:

```
event SimpleEvent: pass
# Later in your code:
log SimpleEvent()
```

While smart contracts can write to Ethereum’s chain data through log events, they are unable to read the on-chain log events they’ve created. However, one of the advantages of writing to Ethereum’s chain data via log events is that logs can be discovered and read on the public chain by light clients. For example, the `logsBloom` value in a published block can indicate whether or not a log event is present. Once the existence of log events has been established, the log data can be obtained from a given transaction receipt.

## Conclusion

Vyper is a powerful and fascinating contract-oriented programming language. Its design is biased toward “correctness,” prioritizing security and simplicity. This approach may allow programmers to write better smart contracts and avoid certain pitfalls that can cause serious vulnerabilities to arise.

However, it’s important to recognize that everything has trade-offs. While Vyper’s stringent design principles enhance security and code clarity, they also limit some of the flexibility that developers may find in other languages. Additionally, Vyper is not as widely used or as developed as Solidity, which means fewer resources, libraries, and tools are available for developers. This can pose challenges for those who are looking to find community support, prebuilt solutions, and comprehensive documentation.

Next, we will look at smart contract security in more detail. Some of the nuances of Vyper design may become more apparent once you read about all the possible security problems that can arise in smart contracts.
