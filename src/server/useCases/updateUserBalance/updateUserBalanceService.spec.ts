import UserRepositoryInMemory from "@/server/repositories/in-memory/userRepositoryInMemory"
import { describe, expect, it } from "vitest";
import CreateUserService from "../createUser/createUserService";
import UpdateUserBalanceService from "./updateUserBalanceService";
import GetUsersService from "../getUserByName/getUserByNameService";

describe("Update User Balance Service", () => {
  it("Should be able to update existing user balance", async () => {
    const userRepository = new UserRepositoryInMemory();

    const createUserService = new CreateUserService({
      userRepository
    });
    const updateUserBalanceService = new UpdateUserBalanceService({
      userRepository
    });
    const getUserByNameService = new GetUsersService({
      userRepository
    });

    const userName = "teste"
    const balance = Math.random();

    createUserService.execute({
      userName: userName
    })
    updateUserBalanceService.execute({
      userName,
      balance,
    })

    const user = getUserByNameService.execute(userName);

    expect(user).not.toBe(undefined);
    expect(user?.userName).toBe(userName);
    expect(user?.balance).toBe(balance);
  })
})
