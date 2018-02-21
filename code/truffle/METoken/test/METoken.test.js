const METoken = artifacts.require("METoken");

contract('METoken', accounts => {

  beforeEach(async function () {
    InstanceMEToken = await METoken.new();
  });

  it('has a name', async function () {
    const name = await InstanceMEToken.name();
    assert.notEqual(name, "", "token name shouldn't be empty");
  });

  it('has a symbol', async function () {
    const symbol = await InstanceMEToken.symbol();
    assert.notEqual(symbol, "", "token symbol shouldn't be empty");
  });

  it('has decimals', async function () {
    const decimals = await InstanceMEToken.decimals();
    assert.notEqual(decimals, "", "token decimals shouldn't be empty");
  });

  it('owner has 2100000000 tokens', async function () {
    const balance = await InstanceMEToken.balanceOf(accounts[0]);
    assert.equal(balance, 2100000000, "owner doesn't have 2100000000 tokens");
  });
});