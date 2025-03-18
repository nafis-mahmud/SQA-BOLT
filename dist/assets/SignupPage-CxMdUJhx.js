import{r as a,u as _,j as e,C as f,a as p,b as j,d as g,g as w,B as y,L as N,e as k,f as l,I as i,h as C}from"./index-D4bdMp4q.js";function I(){const[o,v]=a.useState(""),[t,S]=a.useState(""),[c,b]=a.useState(""),[d,u]=a.useState(!1),[m,n]=a.useState(null),[P,E]=a.useState(!1);_();const F=async s=>{if(s.preventDefault(),n(null),t!==c){n("Passwords do not match");return}if(t.length<6){n("Password must be at least 6 characters");return}u(!0);try{const{data:r,error:h}=await C.auth.signUp({email:o,password:t,options:{emailRedirectTo:`${window.location.origin}/login`}});if(h)throw h;if(r.user){const{error:x}=await C.from("profiles").insert({id:r.user.id,first_name:"",last_name:"",avatar_url:"",created_at:new Date().toISOString(),updated_at:new Date().toISOString()});x&&console.error("Error creating user profile:",x)}E(!0)}catch(r){console.error("Signup error:",r),n(r.message||"Failed to sign up")}finally{u(!1)}};return P?e.jsx("div",{className:"flex min-h-screen items-center justify-center bg-slate-50 p-4",children:e.jsxs(f,{className:"w-full max-w-md",children:[e.jsxs(p,{children:[e.jsx(j,{className:"text-2xl font-bold",children:"Account created successfully"}),e.jsx(g,{children:"Your account has been created. Please check your email for a confirmation link."})]}),e.jsx(w,{children:e.jsx(y,{asChild:!0,className:"w-full",children:e.jsx(N,{to:"/login",children:"Back to login"})})})]})}):e.jsx("div",{className:"flex min-h-screen items-center justify-center bg-slate-50 p-4",children:e.jsxs(f,{className:"w-full max-w-md",children:[e.jsxs(p,{className:"space-y-1",children:[e.jsx(j,{className:"text-2xl font-bold",children:"Create an account"}),e.jsx(g,{children:"Enter your email and create a password to get started"})]}),e.jsx(k,{children:e.jsxs("form",{onSubmit:F,className:"space-y-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(l,{htmlFor:"email",children:"Email"}),e.jsx(i,{id:"email",type:"email",placeholder:"name@example.com",value:o,onChange:s=>v(s.target.value),required:!0})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(l,{htmlFor:"password",children:"Password"}),e.jsx(i,{id:"password",type:"password",value:t,onChange:s=>S(s.target.value),required:!0})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(l,{htmlFor:"confirmPassword",children:"Confirm Password"}),e.jsx(i,{id:"confirmPassword",type:"password",value:c,onChange:s=>b(s.target.value),required:!0})]}),m&&e.jsx("p",{className:"text-sm text-red-500",children:m}),e.jsx(y,{type:"submit",className:"w-full",disabled:d,children:d?"Creating account...":"Create account"})]})}),e.jsx(w,{className:"flex justify-center",children:e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Already have an account?"," ",e.jsx(N,{to:"/login",className:"text-primary hover:underline",children:"Sign in"})]})})]})})}export{I as default};
