"use strict";(self.webpackChunkreal_estate_app=self.webpackChunkreal_estate_app||[]).push([[584],{584:(e,t,s)=>{s.r(t),s.d(t,{default:()=>n});var o=s(43),r=s(216),a=s(579);const n=function(e){let{setToken:t,setNotification:s}=e;const[n,i]=(0,o.useState)(""),[u,l]=(0,o.useState)(""),[p,c]=(0,o.useState)(""),d=(0,r.Zp)();return(0,a.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),n&&u)try{const e=await fetch("/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:n,password:u})}),o=await e.json();e.ok?(t(o.token),localStorage.setItem("token",o.token),s({message:"Connexion r\xe9ussie",type:"success"}),d("/")):(c("Nom d'utilisateur ou mot de passe incorrect"),s({message:"Nom d'utilisateur ou mot de passe incorrect",type:"error"}))}catch(p){c("Erreur lors de la connexion"),s({message:"Erreur lors de la connexion",type:"error"})}else c("Veuillez remplir tous les champs")},children:[(0,a.jsx)("input",{type:"text",placeholder:"Nom d'utilisateur",value:n,onChange:e=>i(e.target.value),required:!0}),(0,a.jsx)("input",{type:"password",placeholder:"Mot de passe",value:u,onChange:e=>l(e.target.value),required:!0}),p&&(0,a.jsx)("p",{style:{color:"red"},children:p}),(0,a.jsx)("button",{type:"submit",children:"Connexion"})]})}}}]);
//# sourceMappingURL=584.a378d4ca.chunk.js.map