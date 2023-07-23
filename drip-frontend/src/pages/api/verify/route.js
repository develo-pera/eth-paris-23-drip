// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// in src/app/api/verify/route.ts

import {
  AuthType,
  SismoConnect,
} from "@sismo-core/sismo-connect-server";
import { NextResponse } from "next/server";

const sismoConnect = SismoConnect({
  config: {
    appId: "0x5f9062dd7b98d646d5f0ffa08973dcab",
    vault: {
      // For development purposes insert the Data Sources that you want to impersonate here
      // Never use this in production
      impersonate: [
        "0xE0fF737685fdE7Fd0933Fc280D53978b3d0700D5",
      ],
    },
  },
});

// this is the API route that is called by the SismoConnectButton
export async function POST(req) {
  const sismoConnectResponse = await req.json();
  try {
    // verify the sismo connect response that corresponds to the request
    const result = await sismoConnect.verify(sismoConnectResponse, {
      auths: [{ authType: AuthType.VAULT }],
      claims: [
        // ENS DAO Voters
        { groupId: "0x85c7ee90829de70d0d51f52336ea4722" },
        // Gitcoin passport with at least a score of 15
      ],
      // verify signature from users.
      signature: { message: "I was there" },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(e.message, { status: 500 });
  }
}
