import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";
import { FcGoogle } from 'react-icons/fc'

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
        <section
          style={{height: "80vh"}}>
            <div className="flex justify-center items-center h-full w-full">
                <div className="space-y-5">
                  <div className="text-center">
                    <h1 className="text-lg font-semibold text-Jet">Welcome back</h1>
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
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  if (session) {
    return { redirect: { destination: context?.query?.callbackUrl} };
  }

  const providers = await getProviders();
  
  return {
    props: { providers: providers ?? [] },
  }
}