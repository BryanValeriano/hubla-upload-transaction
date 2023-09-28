import UserRepositoryInMemory from "@/server/repositories/in-memory/userRepositoryInMemory"
import CreateUserService from "./createUserService";
import { describe, expect, it } from "vitest";

describe("Create User Service", () => {
  it("Should be able to create a new User", async () => {
    const userRepository = new UserRepositoryInMemory();
    const createUserService = new CreateUserService({
      userRepository
    });

    createUserService.execute({
      userName: "teste"
    })

    const user = userRepository.getByName("teste");

    expect(user).not.toBe(undefined);
    expect(user?.userName).toBe("teste");
  })
})
