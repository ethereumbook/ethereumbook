# Preface

This book is a collaboration between me (Carlo Parisi, aka Blackie), Alessandro Mazza, and Niccolò Pozzolini. The first edition, which of course heavily influenced our work, was written between 2016 and 2019 by Andreas M. Antonopoulos and Dr. Gavin Wood.

In November 2023, a series of very fortunate coincidences brought Andreas and me together in Glasgow. There, after a few beers and a few autographs, I asked him if he had any intention of writing a second edition of *Mastering Ethereum*. This was because, even though the first edition is a masterpiece, it hasn't aged well; it was published in 2019, back when Ethereum was still using proof of work and had a very different roadmap.

Andreas's response was that he wasn't planning to write a second edition, but our conversation ended up sparking the idea that led me to take on this project. Less than a day after our meeting in Glasgow, I was talking with O'Reilly about the possibility of writing a second edition.

I immediately knew this would be a big and important task. While I was honored by the opportunity, I was also afraid I might not be able to do a good enough job. I've been a fan of Andreas's work for years; he's the reason I was able to understand Bitcoin as deeply as I did back in 2014–2015, so I knew I needed help.

The first person who came to mind was Alessandro. He was involved in the project within the first few hours. As soon as the opportunity became real, I texted and asked if he wanted to join me. He instantly and happily said yes (without knowing any of the conditions or even whether it was a paid job).

Niccolò was a bit harder to convince. It took a full month of rejections to get him on board. Luckily, I'm very stubborn and wasn't willing to take no for an answer. After one month, he finally agreed. With that, our full team was ready, and the *Mastering Ethereum: Second Edition* project was officially launched.

I hope that every reader of this book gains at least a bit of knowledge from it. *Mastering Ethereum* was a book that taught me—and thousands of others—so much, and we worked hard to maintain that same level of quality. It took two years of research and writing to complete, and I'd be lying if I said it was easy.

We're also very proud to be an all-Italian team on this project. Hopefully, that brings some pride to the Italian crypto community as well.

## How to Use This Book

The book is intended to serve both as a reference manual and as a cover-to-cover exploration of Ethereum. The first two chapters offer a gentle introduction, suitable for novice users, and the examples in those chapters can be completed by anyone with a bit of technical skill. Those two chapters will give you a good grasp of the basics and allow you to use the fundamental tools of Ethereum. Parts of Chapter 3 and beyond are intended for programmers and include many technical topics and programming examples, but they still should be understandable by anyone, for the most part.

To serve as both a reference manual and a cover-to-cover narrative about Ethereum, the book inevitably contains some duplication. Some topics, such as gas, have to be introduced early enough for the rest of the topics to make sense but are also examined in depth in their own sections.

Finally, the book's index allows readers to find very specific topics and the relevant sections with ease, by keyword.

## Intended Audience

This book is mostly intended for everyone. This book will teach you how smart contract blockchains work, how to use them, and how to develop smart contracts and decentralized applications with them. The first few chapters are also suitable as an in-depth introduction to Ethereum for beginners.

## Code Examples

The examples are illustrated in Solidity, Vyper, and JavaScript, using the command line of a Unix-like operating system. All the code snippets can be replicated on most operating systems with a minimal installation of compilers, interpreters, and libraries for the corresponding languages. Where necessary, we provide basic installation instructions and step-by-step examples of the output of those instructions.

All the code snippets use real values and calculations where possible, so you can build from example to example and see the same results in any code you write to calculate the same values. For example, the private keys and corresponding public keys and addresses are all real. The sample transactions, contracts, blocks, and blockchain references have all been introduced to the actual Ethereum blockchain and are part of the public ledger, so you can review them.

## Ethereum Addresses and Transactions in this Book

The Ethereum addresses, transactions, keys, QR codes, and blockchain data used in this book are, for the most part, real. That means you can browse the blockchain, look at the transactions offered as examples, retrieve them with your own scripts or programs, and so forth.

However, note that the private keys used to construct the addresses printed in this book have been "burned." This means that if you send money to any of these addresses, the money will be either lost forever or (more likely) appropriated, since anyone who reads the book can take it using the private keys printed herein.

> **Warning**  
>
> Do not send money to any of the addresses in this book. Your money will be taken by another reader or lost forever.

## Conventions Used in This Book

The following typographical conventions are used in this book:

*Italic*

Indicates new terms, URLs, email addresses, filenames, and file extensions.

`Constant width`

Used for program listings, as well as within paragraphs to refer to program elements such as variable or function names, databases, data types, environment variables, statements, and keywords.

**`Constant width bold`**

Shows commands or other text that should be typed literally by the user.

*`Constant width italic`*

Shows text that should be replaced with user-supplied values or by values determined by context.

> **Tip**  
>
> This element signifies a tip or suggestion.

> **Note**  
>
> This element signifies a general note.

> **Warning**  
>
> This element indicates a warning or caution.

## Using Code Examples

In our commitment to collaboration, we worked with O'Reilly Media to make this book available under a Creative Commons license.

If you have a technical question or a problem using the code examples, please send an email to <support@oreilly.com>.

This book is here to help you get your job done. In general, if example code is offered with this book, you may use it in your programs and documentation. You do not need to contact us for permission unless you're reproducing a significant portion of the code. For example, writing a program that uses several chunks of code from this book does not require permission. Selling or distributing examples from O'Reilly books does require permission. Answering a question by citing this book and quoting example code does not require permission. Incorporating a significant amount of example code from this book into your product's documentation does require permission.

We appreciate, but generally do not require, attribution. An attribution usually includes the title, author, publisher, and ISBN. For example: "*Mastering Ethereum*, 2nd ed., by Andreas M. Antonopoulos, Gavin Wood, Carlo Parisi, Alessandro Mazza, and Niccolò Pozzolini (O'Reilly). Copyright 2026 Carlo Parisi, Alessandro Mazza, and Niccolò Pozzolini, 978-1-098-16842-1."

If you feel your use of code examples falls outside fair use or the permission given above, feel free to contact us at permissions@oreilly.com.

## O'Reilly Online Learning

> **Note**  
>
> For more than 40 years, O'Reilly Media has provided technology and business training, knowledge, and insight to help companies succeed.

Our unique network of experts and innovators share their knowledge and expertise through books, articles, and our online learning platform. O'Reilly's online learning platform gives you on-demand access to live training courses, in-depth learning paths, interactive coding environments, and a vast collection of text and video from O'Reilly and 200+ other publishers. For more information, visit [oreilly.com](https://oreilly.com).

## How to Contact Us

Please address comments and questions concerning this book to the publisher:

O'Reilly Media, Inc.

141 Stony Circle, Suite 195

Santa Rosa, CA 95401

800-889-8969 (in the United States or Canada)

707-827-7019 (international or local)

707-829-0104 (fax)

<support@oreilly.com>

[oreilly.com/about/contact.html](https://oreilly.com/about/contact.html)

We have a web page for this book, where we list errata and any additional information. You can access this page at [https://oreil.ly/MasteringEthereum2e](https://oreil.ly/MasteringEthereum2e).

For news and information about our books and courses, visit [https://oreilly.com](https://oreilly.com).

Find us on [LinkedIn](https://linkedin.com/company/oreilly-media)

Watch us on [YouTube](https://youtube.com/oreillymedia)

## Contacting Carlo

Subscribe to Carlo's channel on [YouTube](https://www.youtube.com/@BlackieCrypto)

Follow Carlo on [Twitter/X]( https://x.com/ManInBlackie)

Connect with Carlo on [LinkedIn](https://www.linkedin.com/in/carloparisis)

Email: <carlo.parisi01234@gmail.com>

## Contacting Alessandro

Follow Alessandro on [GitHub](https://github.com/alessandromazza98)

Connect with Alessandro on [LinkedIn](https://www.linkedin.com/in/alessandro-mazza-a8b181320)

Follow Alessandro on [Twitter/X (Italian profile)](https://x.com/alessandromazza)

Follow Alessandro on [Twitter/X (English profile)](https://x.com/alemaz98)

Subscribe to Alessandro's [YouTube channel](https://www.youtube.com/@alessandro-mazza)

## Contacting Niccolò

Follow Niccolò on [Twitter/X](https://x.com/idrocortisone)

Connect with Niccolò on [LinkedIn](https://www.linkedin.com/in/niccolo-pozzolini)

## Acknowledgments by Carlo

I owe a lot of what has happened in my career and personal life to Andreas's work. Thanks to the first edition of *Mastering Bitcoin*, I was able, back in 2014 and 2015, to truly understand the potential of Bitcoin. Because of that, I decided to pursue a career in crypto. At the time, there weren't many complete resources available, so *Mastering Bitcoin* was an incredible gift to the entire community. I wouldn't have the career I have today and probably my life would be very different if it weren't for that incredible work. The same goes for *Mastering Ethereum*. For this reason, Andreas, thank you so much.

Thank you to Nicola Luigi Guglielmo Di Nanna, my high school computer science professor. Without you, I probably would not have discovered my passion for programming and, subsequently, for blockchains. They say a good professor can change a student's life; you certainly did. Thank you for sharing your passion for computer science and for being such an inspiring role model.

Thank you also to Alessandro and Niccolò, who helped so much in writing this book, and to all of our incredible tech reviewers.

Thank you to Michelle Smith and Shira Evans from O'Reilly, who supported us every step of the way.

Thank you to the Italian community, particularly my own community on Discord, YouTube, and Twitter, which gave me the confidence to take on this and many other projects.

Thank you to the amazing Ethereum community. We wouldn't have been able to do as much research—or write as deeply—without your ongoing support and contributions.

And last but not least, thank you to my wonderful family, who supported me in everything I did and allowed me to freely explore my passions and interests.

## Acknowledgments by Alessandro

There are so many things I'm grateful for. First of all, I'd like to thank Carlo for reaching out to me and giving me the amazing opportunity to write this book. I still remember the first time we met in person, in Catanzaro, Italy.

Thank you to my university professor, Dr. Luca Giuzzi, for allowing me to dedicate my thesis to Bitcoin and the Schnorr digital signature algorithm. That was the beginning of my career in the cryptocurrency space.

A heartfelt thank you to my Italian community, who gave me confidence and indirectly brought me to where I am today. I probably wouldn't have met Carlo if it weren't for their support.

Thank you to O'Reilly, and in particular to Shira Evans and Michelle Smith, who guided us throughout this journey. Their meticulous coordination and support, along with the help of all the reviewers, made this book possible.

Finally, I want to thank my family and my girlfriend, Alessandra, for always supporting and loving me.

## Acknowledgments by Niccolò

I want to thank Carlo for giving me the chance to write this book with him. Over the past two years, we've worked on many projects together and shared plenty of laughs, trips abroad, and now this book. Working with you has made this journey both fun and rewarding.

I'm grateful to Andreas and Gavin for creating the first version of *Mastering Ethereum*. Their book opened my eyes to the world of blockchain and has done the same for so many others. Their work helped build and grow this amazing blockchain community that we're all part of today.

A big thank you to Michelle Smith and Shira Evans from O'Reilly for supporting us from start to finish. You helped us with all the paperwork, kept us on schedule, and guided us through the whole process of making this book a reality.

To my family, my friends, and my girlfriend, Giuditta, I can't thank you enough for always being there for me. During the many months of writing, you put up with my busy schedule and stress. You listened when I needed to talk through ideas, you understood when I couldn't make it to gatherings because of deadlines, and you kept encouraging me when things got tough. Your constant support gave me the strength and focus to keep going. The book you're holding isn't just my work; it exists because of the love and support you've always shown me.

## Contributions

We'd all like to thank our tech reviewers:

- Ben Edgington
- Caleb Lent
- Brian Wu
- Gonçalo Magalhães

They have helped us immensely in improving the quality of the book. Thank you so much to our wonderful tech reviewers.
