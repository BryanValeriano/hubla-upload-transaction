# Transactions File Uploader

This project is a web interface with a dedicated area for uploading a file that contains transactions of sold products/services made by creators and affiliates.

## Table of Contents
* Technical and architectural decisions
* Technologies Used
* Setup and Installation
* Usage
* Implementation Details
* Tests
* Additional notes / Impovements

## Technical and architectural decisions
The development of this application prioritizes simplicity in:

- Modifying data persistence methods.
- Altering user interface types (GUI, CLI, CUI, etc.).
- Adding and optimizing features.

The application's main components – UI, API, business rules, and database – are meticulously decoupled to realize these priorities.


#### Change data persistency method or implementation.
The data layer is isolated following the repository pattern. We can change the data persistence method by implementing the interfaces `ITransactionRepository` and `IUserRepository`. We use dependency injection to pass which of the implementations the application is going to use. At the moment we have three possible implementations, each one designed for different environments (test, development, and production).

```
//container.ts

interface Container {
  transactionRepository: ITransactionRepository
  userRepository: IUserRepository;
}

const dev: Container = {
  transactionRepository: new TransactionRepositoryJSON(),
  userRepository: new UserRepositoryJSON()
}

const test: Container = {
  transactionRepository: new TransactionRepositoryInMemory(),
  userRepository: new UserRepositoryInMemory()
}

const prod: Container = {
  transactionRepository: new TransactionRepositoryPrismaMySQL(),
  userRepository: new UserRepositoryPrismaMySQL()
}

export function container(): Container {
  const mode = process.env.MODE || 'prod'

  switch (mode) {
    case 'dev':
      return dev
    case 'prod':
      return prod
    case 'test':
      return test
    default:
      throw new Error('Invalid mode')
  }
}
```

#### Change user interface
All the business rules are located in the src/server folder. 
We can easily choose to run the application with another interface such as CLI (Command Line Interface) or a CUI (Conversational user interface) like Chatbots, using the same core functionalities already implemented and carefully isolated.

#### Add and optimize features
As described, all the main parts of the application are isolated and independent from one another. Therefore, we can easily add and optimize features. Here are a few examples of this:
- **Optimization**: We can minimize the database queries by performing batch queries commonly known as transactions. To implement this we can create another implementation of the repository interface.
- **New feature**: We can add features to add, delete, and update individual transactions and users. These functionalities are called use cases on the application and to implement new ones we just need to make sure the repository interface has the methods we are going to need (if not, we can add them) for our purposes and correctly use it.

## Technologies Used
Technologies Used

* [Next.js](https://nextjs.org/): For building the user interface and handling server-side rendering.
* [Tailwind CSS](https://tailwindcss.com): Employed for styling the application, it allows rapid development of custom user interfaces with utility-first CSS classes, reducing the need for custom CSS. 
* [Prisma](https://www.prisma.io/): Utilized as the ORM for handling database operations, it provides a clear and concise way to define models and relationships, improving the development workflow.
* [Vitest](https://vitest.dev/): Used for testing the application, it offers a fast and scalable testing solution, ensuring the reliability and stability of the application. It has the exact same syntax as Jest and does not need extra configuration to deal with typescript.
* [Docker](https://www.docker.com/): Facilitates the development, shipping, and running of applications inside containers, ensuring consistency across multiple development and deployment environments.
