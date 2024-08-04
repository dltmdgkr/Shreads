// import { createServerClient, type CookieOptions } from "@supabase/ssr";
// import { cookies } from "next/headers";

// export function createClient() {
//   const cookieStore = cookies();

//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           return cookieStore.get(name)?.value;
//         },
//         set(name: string, value: string, options: CookieOptions) {
//           try {
//             cookieStore.set({ name, value, ...options });
//           } catch (error) {
//             // The `set` method was called from a Server Component.
//             // This can be ignored if you have middleware refreshing
//             // user sessions.
//           }
//         },
//         remove(name: string, options: CookieOptions) {
//           try {
//             cookieStore.set({ name, value: "", ...options });
//           } catch (error) {
//             // The `delete` method was called from a Server Component.
//             // This can be ignored if you have middleware refreshing
//             // user sessions.
//           }
//         },
//       },
//     }
//   );
// }

// import { type CookieOptions, createServerClient } from "@supabase/ssr";
// import { cookies } from "next/headers";
// import { Database } from "../database.types";

// export default function useSupabaseServer(
//   cookieStore: ReturnType<typeof cookies>
// ) {
//   return createServerClient<Database>(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           return cookieStore.get(name)?.value;
//         },
//         set(name: string, value: string, options: CookieOptions) {
//           try {
//             cookieStore.set({ name, value, ...options });
//           } catch (error) {
//             console.error("Error setting cookie:", error);
//           }
//         },
//         // remove(name: string, options: CookieOptions) {
//         //   try {
//         //     cookieStore.set({ name, value: "", ...options });
//         //   } catch (error) {
//         //     console.error("Error removing cookie:", error);
//         //   }
//         // },
//       },
//     }
//   );
// }

// import { createServerClient, type CookieOptions } from "@supabase/ssr";
// import { cookies } from "next/headers";

// export function createClient() {
//   const cookieStore = cookies();

//   // Create a server's supabase client with newly configured cookie,
//   // which could be used to maintain user's session
//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           return cookieStore.get(name)?.value;
//         },
//         set(name: string, value: string, options: CookieOptions) {
//           try {
//             cookieStore.set({ name, value, ...options });
//           } catch (error) {
//             // The `set` method was called from a Server Component.
//             // This can be ignored if you have middleware refreshing
//             // user sessions.
//           }
//         },
//         remove(name: string, options: CookieOptions) {
//           try {
//             cookieStore.set({ name, value: "", ...options });
//           } catch (error) {
//             // The `delete` method was called from a Server Component.
//             // This can be ignored if you have middleware refreshing
//             // user sessions.
//           }
//         },
//       },
//     }
//   );
// }

"use server";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "../database.types";

// 서버 Supabase 클라이언트 생성 함수
export const createServerSupabaseClient = async (
  cookieStore: ReturnType<typeof cookies> = cookies(),
  admin: boolean = false
) => {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    admin
      ? process.env.SUPABASE_SERVICE_ROLE_KEY!
      : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // 서버 컴포넌트에서 호출될 경우 예외 처리
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // 서버 컴포넌트에서 호출될 경우 예외 처리
          }
        },
      },
    }
  );
};

// // 관리자 권한을 가진 Supabase 클라이언트 생성 함수
// export const createServerSupabaseAdminClient = async (
//   cookieStore: ReturnType<typeof cookies> = cookies()
// ) => {
//   return createServerSupabaseClient(cookieStore, true);
// };
export const createServerSupabaseAdminClient = async () => {
  const cookieStore = cookies();
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // 서버 컴포넌트에서 호출될 경우 예외 처리
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // 서버 컴포넌트에서 호출될 경우 예외 처리
          }
        },
      },
    }
  );
};
