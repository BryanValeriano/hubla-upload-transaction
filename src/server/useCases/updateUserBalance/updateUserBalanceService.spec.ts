import { describe, expect, it } from "vitest";
import CreateUserService from "../createUser/createUserService";
import UpdateUserBalanceService from "./updateUserBalanceService";
import GetUsersService from "../getUserByName/getUserByNameService";
import { container } from "@/server/container";

describe("Update User Balance Service", () => {
  it("Should be able to update existing user balance", async () => {
    const { userRepository } = container();

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

    await createUserService.execute({
      userName: userName
    })
    await updateUserBalanceService.execute({
      userName,
      balance,
    })

    const user = await getUserByNameService.execute(userName);

    expect(user).not.toBe(undefined);
    expect(user?.userName).toBe(userName);
    expect(user?.balance).toBe(balance);
  })
})
