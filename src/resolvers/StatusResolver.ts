import { Query, Resolver } from "type-graphql";

@Resolver()
export class StatusResolver {
  @Query(() => String)
  async status() {
    return "OK";
  }
}
