import{r,u as C,j as s,C as u,a as h,b as m,d as w,g as v,B as x,e as S,f,I as p,h as j}from"./index-D4bdMp4q.js";function E(){const[t,g]=r.useState(""),[l,y]=r.useState(""),[c,d]=r.useState(!1),[i,o]=r.useState(null),[N,b]=r.useState(!1),n=C();r.useEffect(()=>{(async()=>{const{data:e}=await j.auth.getSession();e.session||n("/login")})()},[n]);const P=async a=>{if(a.preventDefault(),o(null),t!==l){o("Passwords do not match");return}if(t.length<6){o("Password must be at least 6 characters");return}d(!0);try{const{error:e}=await j.auth.updateUser({password:t});if(e)throw e;b(!0),setTimeout(()=>{n("/login")},3e3)}catch(e){console.error("Password reset error:",e),o(e.message||"Failed to reset password")}finally{d(!1)}};return N?s.jsx("div",{className:"flex min-h-screen items-center justify-center bg-slate-50 p-4",children:s.jsxs(u,{className:"w-full max-w-md",children:[s.jsxs(h,{children:[s.jsx(m,{className:"text-2xl font-bold",children:"Password reset successful"}),s.jsx(w,{children:"Your password has been reset successfully. You will be redirected to the login page shortly."})]}),s.jsx(v,{children:s.jsx(x,{onClick:()=>n("/login"),className:"w-full",children:"Go to login"})})]})}):s.jsx("div",{className:"flex min-h-screen items-center justify-center bg-slate-50 p-4",children:s.jsxs(u,{className:"w-full max-w-md",children:[s.jsxs(h,{className:"space-y-1",children:[s.jsx(m,{className:"text-2xl font-bold",children:"Reset password"}),s.jsx(w,{children:"Enter your new password below"})]}),s.jsx(S,{children:s.jsxs("form",{onSubmit:P,className:"space-y-4",children:[s.jsxs("div",{className:"space-y-2",children:[s.jsx(f,{htmlFor:"password",children:"New Password"}),s.jsx(p,{id:"password",type:"password",value:t,onChange:a=>g(a.target.value),required:!0})]}),s.jsxs("div",{className:"space-y-2",children:[s.jsx(f,{htmlFor:"confirmPassword",children:"Confirm New Password"}),s.jsx(p,{id:"confirmPassword",type:"password",value:l,onChange:a=>y(a.target.value),required:!0})]}),i&&s.jsx("p",{className:"text-sm text-red-500",children:i}),s.jsx(x,{type:"submit",className:"w-full",disabled:c,children:c?"Resetting password...":"Reset password"})]})})]})})}export{E as default};
