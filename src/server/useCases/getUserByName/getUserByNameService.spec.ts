import { describe, expect, it } from "vitest";
import CreateUserService from "../createUser/createUserService";
import { container } from "@/server/container";

describe("Get User By Name Service", () => {
  it("Should be able to find a created user by name", async () => {
    const { userRepository } = container();
    const createUserService = new CreateUserService({
      userRepository
    });

    const userName = "teste";

    await createUserService.execute({ userName })
    const user = await userRepository.getByName("teste");

    expect(user).not.toBe(undefined);
    expect(user?.userName).toBe("teste");
  })
})
