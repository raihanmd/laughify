import PREFIX from "~/constant/PREFIX";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    status: false,
    message: "",
  }),
  actions: {
    async OAuthGoogle() {
      try {
        const supabase = useSupabaseClient();

        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: getURL(),
          },
        });

        if (error) {
          throw error;
        }

        this.status = true;
        this.message = "OAuth Successfully !!!";
      } catch (error) {
        this.status = false;
        this.message = "OAuth Failed !!!";
      }
    },
    async logout() {
      try {
        const supabase = useSupabaseClient();

        const { error } = await supabase.auth.signOut();

        if (error) {
          throw error;
        }

        this.status = true;
        this.message = "Logout Successfully !!!";
        return navigateTo("/login");
      } catch (error) {
        this.status = false;
        this.message = "Logout Failed !!!";
      }
    },
    async login(req: any) {
      try {
        const supabase = useSupabaseClient();

        //@ts-ignore
        const { data, error } = await supabase.from("users").select("email").eq("email", req.email);

        //@ts-ignore
        if (error || data.length === 0) {
          throw error;
        }

        this.status = true;
        this.message = "Login Successfully !!!";
      } catch (error) {
        this.status = false;
        this.message = "Login Failed !!!";
      }
    },
    async register(req: any) {
      try {
        const supabase = useSupabaseClient();
        //@ts-ignore
        const { error } = await supabase.from("users").insert([{ id: PREFIX.USER + getNanoid(), name: req.name.slice(0, 15) + getNanoid(5), email: req.email, image: req.image }]);
        if (error) {
          throw error;
        }

        this.status = true;
        this.message = "Register Successfully !!!";
      } catch (error) {
        this.status = false;
        this.message = "Register Failed !!!";
      }
    },
  },
});
