import UserRepositoryInMemory from "@/server/repositories/in-memory/userRepositoryInMemory";
import { describe, expect, it } from "vitest";
import CreateUserService from "../createUser/createUserService";

describe("Get User By Name Service", () => {
  it("Should be able to find a created user by name", async () => {
    const userRepository = new UserRepositoryInMemory();
    const createUserService = new CreateUserService({
      userRepository
    });

    const userName = "teste";

    createUserService.execute({ userName })
    const user = userRepository.getByName("teste");

    expect(user).not.toBe(undefined);
    expect(user?.userName).toBe("teste");
  })
})
