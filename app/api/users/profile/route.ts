// import { NextResponse } from "next/server";
// import { getUserFromToken } from "@/src/backend/utils/auth";
// import { UserRepository } from "@/src/backend/repositories/UserRepository";

// export async function GET(req: Request) {
//   const user = await getUserFromToken(req);

//   if (!user) {
//     return NextResponse.json(
//       { error: "Unauthorized" },
//       { status: 401 }
//     );
//   }

//   const profile = await UserRepository.findById(user.id);
//   return NextResponse.json(profile);
// }
import { NextResponse } from "next/server";
import { getUserFromToken } from "@/src/backend/utils/auth";
import { UserRepository } from "@/src/backend/repositories/UserRepository";

const repo = new UserRepository();

export async function GET(req: Request) {
  const user = await getUserFromToken(req);

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const profile = await  UserRepository.findById(user.userId); // IMPORTANT
  return NextResponse.json(profile);
}
