import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";
import Layout from "@/components/Layout/Layout";
import { FcGoogle } from 'react-icons/fc'

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
        <section
          style={{height: "80vh"}}>
            <div className="flex justify-center items-center h-full w-full">
                <div className="space-y-5">
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-Jet">Welcome back</h1>
                  </div>
                  <div>
                    {Object.values(providers).map((provider) => (
                      <div key={provider.name}>
                        <button onClick={() => signIn(provider.id)}
                        className="border rounded-md px-4 py-2 flex flex-row items-center space-x-5">
                          <FcGoogle  className="text-3xl"/>
                          <span>Sign in with {provider.name}</span>              
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
            </div>
      </section>
    </Layout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();
  
  return {
    props: { providers: providers ?? [] },
  }
}