F=require('fs'),e=process.env,A=e.MAKEFUN_INPUT_DIR||'/input',B=e.MAKEFUN_OUTPUT_DIR||'/output',L='udlr'
S=T=>{
let R=T.split('\n'),W=Math.max(...R.map(s=>s.length))+2,H='#'.repeat(W),G=[...(H+R.map(r=>('#'+r).padEnd(W-1,'#')+'#').join('')+H)],Y,P,g=new Set(),b=[],O=[-W,W,-1,1],H2={has:n=>(n/W|0)==Y&&G[n]!='#'}
G.forEach((c,i)=>{'.*+'.includes(c)&&g.add(i),'$*'.includes(c)&&b.push(i),'@+'.includes(c)&&(P=i%W,Y=i/W|0)})
let Q=(s,o,a)=>{let m={},n2=s,q=[s],h=0;m[s]='';while(h<q.length){let c=q[h++];for(let d=4;d--;){let n=c+O[d];if(a.has(n)&&!o.includes(n)&&!(n in m)){m[n]=m[c]+L[d];q.push(n);if(n<n2)n2=n}}}return[m,n2]}
let mv='',ps=Y*W+P
for(y=1;y<=R.length;y++)for(x=1;x<W-1;x++){let i=y*W+x;if(G[i]=='#')continue;if(y==Y)continue;let C=[],D=0,E=0,s=[i];G[i]='#';while(s.length){let c=s.pop();C.push(c);if(!D&&((c/W|0)-Y)**2==1){let n=Y*W+c%W;if(G[n]!='#'){D=c;E=n}}for(let d=4;d--;){let n=c+O[d];if((n/W|0)==Y||G[n]=='#')continue;G[n]='#';s.push(n)}}
if(!E)return''
let u=Q(ps,[],H2)[0]
if(!(E in u))return''
mv+=u[E]
let S2=new Set([...C,E]),bx=b.filter(i=>S2.has(i)),q=[[bx,E,'']],seen={},qi=0,f=0
seen[bx+'|'+Q(E,bx,S2)[1]]=1
while(qi<q.length&&qi<2e5&&!f){
let[X,p,m2]=q[qi++],u=Q(p,X,S2)[0]
if(X.every(i=>g.has(i))){if(D in u){mv+=m2+u[D]+(E>D?'d':'u');ps=E;f=1}continue}
for(let bi in X){let B2=X[bi]
for(let d=4;d--;){let h3=B2-O[d]
if(!(h3 in u))continue
let t=B2+O[d]
if(!S2.has(t)||t==E||X.includes(t))continue
let nx=X.slice();nx[bi]=t;nx.sort((a,c)=>a-c)
let k=nx+'|'+Q(B2,nx,S2)[1]
if(seen[k])continue
seen[k]=1
q.push([nx,B2,m2+u[h3]+L[d]])
}}}
if(!f)return''
}
return mv
}
for(k=1;k<6;k++){let n='i00'+k,s='';try{s=S(F.readFileSync(A+'/'+n+'/level.txt')+'')}catch{s=''}F.mkdirSync(B+'/'+n,{recursive:true});F.writeFileSync(B+'/'+n+'/solution.txt',s)}
