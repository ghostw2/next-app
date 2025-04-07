"use server";

import { signInFormSchema, signUpFormSchema } from "@/lib/validators";
import { auth, signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { PrismaClient } from "@prisma/client";
import { prisma } from "@/prisma/prisma-client";
import { formatError } from "../utils";
import { ShippingAddress } from "@/types";
import {
  paymentMethodSchema,
  ShippingAddressSchema,
} from "../client-safe-validators";
import { z } from "zod";

export const signInWithCredentials = async (
  prevstate: unknown,
  formdata: FormData
) => {
  try {
    const data = signInFormSchema.parse({
      email: formdata.get("email"),
      password: formdata.get("password"),
    });
    await signIn("credentials", data);
    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      message: "Could not sign in , wrong email or password",
    };
  }
};
export const signUpUser = async (prevstate: unknown, formData: FormData) => {
  try {
    const plainPassword = formData.get("password");
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: plainPassword,
      confirmPassword: formData.get("confirmPassword"),
    });

    user.password = hashSync(plainPassword as string, 10);
    const prisma = new PrismaClient();
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
    });
    return { success: true, message: "Successfully created new user" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.log(error);
    return { success: false, message: formatError(error) };
  }
};
//sign user out
export async function signOutUser() {
  console.log("sign-out");
  await signOut();
}
export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!user) throw new Error("User not found");
  return user;
}

export async function UpdateUserShippingAddress(data: ShippingAddress) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      throw new Error("User Id  not found");
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!currentUser) {
      throw new Error("User not found");
    }
    const address = ShippingAddressSchema.parse(data);
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        address: address,
      },
    });
    return { success: true, message: "Shipping address updated successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
//update user payment method
export async function UpdateUserPaymentMethod(
  data: z.infer<typeof paymentMethodSchema>
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) throw new Error("User id could be found");
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });
    if (!user) throw new Error("User could not be found");
    const parsed = paymentMethodSchema.parse(data);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        paymentMethod: parsed.type,
      },
    });
    return {
      success: true,
      message: "Successfully update user Payment Method",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
export async function GetUserPaymentMethod() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });
  if (!user) return null;
  return user.paymentMethod;
}
