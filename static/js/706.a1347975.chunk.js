"use strict";(self.webpackChunkreact_monkey_blogging_boilerplate=self.webpackChunkreact_monkey_blogging_boilerplate||[]).push([[706],{6306:function(n,e,r){var t=r(9439),o=r(2791),a=r(7115),i=r(4507),s=r(1575),l=r(184);e.Z=function(n){var e=n.control,r=(0,o.useState)(!1),c=(0,t.Z)(r,2),u=c[0],d=c[1];return e?(0,l.jsx)(o.Fragment,{children:(0,l.jsx)(a.Z,{name:"password",type:u?"text":"password",placeholder:"Enter your password",control:e,children:u?(0,l.jsx)(i.Z,{onClick:function(){return d(!u)}}):(0,l.jsx)(s.Z,{onClick:function(){return d(!u)}})})}):null}},5318:function(n,e,r){var t,o=r(168),a=(r(2791),r(1087)),i=r(6444),s=r(184),l=i.ZP.div(t||(t=(0,o.Z)(["\n    min-height: 100vh;\n    padding: 40px;\n    .logo{\n        margin: 0 auto 20px;\n    }\n    .heading{\n        text-align: center;\n        color: ",";;\n        font-weight: bold;\n        font-size: 40;\n        margin-bottom: 24px;\n    }\n    .form{\n        max-width: 500px;\n        margin: 0 auto;\n    }\n    .have-account{\n        margin-top: 14px;\n        margin-bottom: 10;\n        a{\n            display: inline-block;\n            color: ",";\n            font-weight: 500;\n        }\n    }\n"])),(function(n){return n.theme.primary}),(function(n){return n.theme.primary}));e.Z=function(n){var e=n.children;return(0,s.jsx)(l,{children:(0,s.jsxs)("div",{className:"container",children:[(0,s.jsxs)(a.OL,{to:"/",children:[(0,s.jsx)("img",{srcSet:"./logo.png 3x",alt:"logo",className:"logo"}),(0,s.jsx)("h1",{className:"heading",children:"Blogging App"})]}),e]})})}},7706:function(n,e,r){r.r(e);var t=r(4165),o=r(5861),a=r(2791),i=r(9808),s=r(7689),l=r(1087),c=r(5318),u=r(1775),d=r(1134),m=r(4695),h=r(1724),p=r(577),g=r(8255),f=r(648),x=r(6306),j=r(184),v=h.Ry({email:h.Z_().email().required("Please enter your email!"),password:h.Z_().min(8,"Your password must be at least 8 characters").required("Please enter your password!")}).required();e.default=function(){var n,e=(0,i.a)().userInfo,r=(0,s.s0)(),h=(0,d.cI)({mode:"onChange",resolver:(0,m.X)(v)}),b=h.control,w=h.handleSubmit,Z=h.formState,y=Z.errors,_=Z.isValid,k=Z.isSubmitting;(0,a.useEffect)((function(){document.title="Login page",null!==e&&void 0!==e&&e.email&&r("/")}),[]);return(0,a.useEffect)((function(){var n,e=Object.values(y);e.length>0&&p.Am.error(null===(n=e[0])||void 0===n?void 0:n.message,{pauseOnHover:!1})}),[y]),(0,j.jsx)(c.Z,{children:(0,j.jsxs)("form",{className:"form",onSubmit:w((function(e){return(n=n||(0,o.Z)((0,t.Z)().mark((function n(e){return(0,t.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(_){n.next=2;break}return n.abrupt("return");case 2:return n.next=4,(0,g.e5)(f.I,e.email,e.password);case 4:r("/");case 5:case"end":return n.stop()}}),n)})))).apply(this,arguments)})),autoComplete:"off",children:[(0,j.jsxs)(u.gN,{children:[(0,j.jsx)(u.__,{htmlFor:"email",children:"Email"}),(0,j.jsx)(u.II,{name:"email",type:"email",placeholder:"Enter your email",control:b})]}),(0,j.jsxs)(u.gN,{children:[(0,j.jsx)(u.__,{htmlFor:"password",children:"Password"}),(0,j.jsx)(x.Z,{control:b})]}),(0,j.jsx)(u.zx,{type:"submit",isLoading:k,disabled:k,children:"Sign In"}),(0,j.jsx)("div",{className:"have-account",children:(0,j.jsxs)("p",{children:["You don't have an account? ",(0,j.jsx)(l.OL,{to:"/sign-up",children:"Register."})]})})]})})}}}]);
//# sourceMappingURL=706.a1347975.chunk.js.map