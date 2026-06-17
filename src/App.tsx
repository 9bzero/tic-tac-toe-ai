import{useState,useCallback}from'react'
  type Cell="X"|"O"|null
  const LINES=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
  const win=(b:Cell[])=>{for(const[a,c,d]of LINES)if(b[a]&&b[a]===b[c]&&b[a]===b[d])return{p:b[a]!,l:[a,c,d]};return null}
  function mm(b:Cell[],isMax:boolean,depth:number):number{
    const w=win(b);if(w)return w.p==="O"?10-depth:depth-10
    if(!b.includes(null))return 0
    const moves=b.map((_,i)=>i).filter(i=>!b[i])
    if(isMax){let best=-Infinity;for(const m of moves){b[m]="O";best=Math.max(best,mm(b,false,depth+1));b[m]=null}return best}
    let best=Infinity;for(const m of moves){b[m]="X";best=Math.min(best,mm(b,true,depth+1));b[m]=null}return best
  }
  const aiMove=(b:Cell[])=>{let best=-Infinity,move=0;b.forEach((_,i)=>{if(!b[i]){b[i]="O";const s=mm(b,false,0);b[i]=null;if(s>best){best=s;move=i}}});return move}
  export default function App(){
    const[board,setBoard]=useState<Cell[]>(Array(9).fill(null))
    const[xTurn,setXTurn]=useState(true)
    const[sc,setSc]=useState({X:0,O:0,D:0})
    const[vsAI,setVsAI]=useState(true)
    const[diff,setDiff]=useState<"easy"|"hard">("hard")
    const result=win(board)
    const isDraw=!result&&!board.includes(null)
    const play=useCallback((i:number)=>{
      if(board[i]||result||isDraw)return
      if(!xTurn&&vsAI)return
      const nb=[...board];nb[i]="X"
      if(win(nb)){setBoard(nb);setSc(s=>({...s,X:s.X+1}));return}
      if(!nb.includes(null)){setBoard(nb);setSc(s=>({...s,D:s.D+1}));return}
      if(vsAI){
        const m=diff==="hard"?aiMove(nb):nb.map((_,j)=>j).filter(j=>!nb[j])[Math.floor(Math.random()*nb.filter(v=>!v).length)]
        nb[m]="O"
        const w2=win(nb)
        setBoard(nb)
        if(w2)setSc(s=>({...s,O:s.O+1}))
        else if(!nb.includes(null))setSc(s=>({...s,D:s.D+1}))
      }else{setBoard(nb);setXTurn(t=>!t)}
    },[board,result,isDraw,xTurn,vsAI,diff])
    const reset=()=>{setBoard(Array(9).fill(null));setXTurn(true)}
    return(
      <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"1rem",padding:"2rem"}}>
        <h1 style={{fontWeight:800,fontSize:"1.6rem",color:"#f8fafc"}}>Tic-Tac-Toe</h1>
        <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap",justifyContent:"center"}}>
          <button onClick={()=>{setVsAI(true);reset()}} style={{padding:"0.35rem 0.9rem",background:vsAI?"#0ea5e9":"#1e293b",color:vsAI?"#fff":"#94a3b8",border:"none",borderRadius:6,cursor:"pointer",fontWeight:600,fontSize:"0.82rem"}}>vs AI</button>
          <button onClick={()=>{setVsAI(false);reset()}} style={{padding:"0.35rem 0.9rem",background:!vsAI?"#0ea5e9":"#1e293b",color:!vsAI?"#fff":"#94a3b8",border:"none",borderRadius:6,cursor:"pointer",fontWeight:600,fontSize:"0.82rem"}}>2 Players</button>
          {vsAI&&["easy","hard"].map(d=><button key={d} onClick={()=>{setDiff(d as"easy"|"hard");reset()}} style={{padding:"0.35rem 0.9rem",background:diff===d?"#6366f1":"#1e293b",color:diff===d?"#fff":"#94a3b8",border:"none",borderRadius:6,cursor:"pointer",fontWeight:600,fontSize:"0.82rem",textTransform:"capitalize"}}>{d}</button>)}
        </div>
        <div style={{display:"flex",gap:"1.5rem"}}>
          {[{l:"X",v:sc.X,c:"#38bdf8"},{l:"Draw",v:sc.D,c:"#94a3b8"},{l:"O",v:sc.O,c:"#f87171"}].map(({l,v,c})=>(
            <div key={l} style={{textAlign:"center"}}><div style={{fontSize:"1.4rem",fontWeight:800,color:c}}>{v}</div><div style={{fontSize:"0.7rem",color:"#475569"}}>{l}</div></div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,100px)",gap:6,background:"#111827",padding:6,borderRadius:10}}>
          {board.map((cell,i)=>{
            const isWin=result?.l.includes(i)
            return(
              <button key={i} onClick={()=>play(i)} style={{width:100,height:100,background:isWin?"#1e3a5f":"#1e293b",border:"2px solid "+(isWin?"#38bdf8":"#334155"),borderRadius:8,cursor:cell||result?"default":"pointer",fontSize:"2.8rem",fontWeight:900,color:cell==="X"?"#38bdf8":cell==="O"?"#f87171":"transparent",transition:"all 0.15s"}}>{cell||"·"}</button>
            )
          })}
        </div>
        <div style={{height:36,display:"flex",alignItems:"center",justifyContent:"center"}}>
          {result?<div style={{fontWeight:700,color:result.p==="X"?"#38bdf8":"#f87171"}}>{result.p==="X"?"✕ X Wins! 🎉":(vsAI?"🤖 AI Wins!":"○ O Wins! 🎉")}</div>:isDraw?<div style={{color:"#94a3b8",fontWeight:600}}>Draw!</div>:<div style={{color:"#475569",fontSize:"0.9rem"}}>{xTurn?"✕ X's turn":"○ O's turn"}</div>}
        </div>
        {(result||isDraw)&&<button onClick={reset} style={{padding:"0.55rem 1.75rem",background:"#0ea5e9",color:"#fff",border:"none",borderRadius:8,cursor:"pointer",fontWeight:700}}>Play Again</button>}
      </div>
    )
  }