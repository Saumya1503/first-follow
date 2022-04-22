import { useState } from 'react'
import "./App.css";
import axios from 'axios';

function App() {

  const [data, setData] = useState([]);

  const submit = async (e) => {
    e.preventDefault();
    
    const count_nt = e.target.count_nt.value;
    const nts = e.target.nts.value;
    const count_t = e.target.count_t.value;
    const ts = e.target.ts.value;
    const count_p = e.target.count_p.value;
    const ps = e.target.ps.value;
    const start = e.target.start.value;

    const data  = await axios.post('http://localhost:5000/calculate', {count_nt, nts, count_t, ts, count_p, ps, start});
    console.log(data)

    const {msg, err} = data.data;

    if(err){
      setData(["Error", err]);
    }else{
      const output = msg.split("\n");
      setData(output);
    }

  }

  return (
    <div className=''>
      <div className='bg-gray-100 text-center text-3xl md:text-4xl font-semibold text-gray-600 py-10'>
        First and Follow <br/> <div className='text-xl pt-2 md:pt-4 md:text-2xl'>( Compiler Construction )</div>
      </div>
      <div className='mt-10'>
        <form onSubmit={(e)=>submit(e)} className='input m-6 md:m-20 lg:mx-80 text-gray-800 text-md md:text-lg'>

          <div>Use @ as Episilon</div>
          <text>Enter number of Non-Terminals ( Number)</text>
          <input name='count_nt' type='number' className='w-full p-2 my-2 border-2' placeholder='Eg : 3' required /><br/><br/>
          <text>Type all Non-Terminals <b>( Seperated by Space )</b></text>
          <textarea name='nts' rows={2} type='text' className='w-full p-2 border-2 my-2' placeholder='eg -> S A ' required />
          <br/><br/><br/>

          <text>Enter number of Terminals</text>
          <input name='count_t' type='number' className='w-full p-2 my-2 border-2' placeholder='Eg : 2' required /><br/><br/>
          <text>Type all Terminals <b>( Seperated by Space )</b></text>
          <textarea name='ts' rows={2} type='text' className='w-full p-2 border-2 my-2' placeholder='eg -> a b c' required />
          <br/><br/><br/>

          <text>Enter number of Productions ( Number)</text>
          <input name='count_p' type='number' className='w-full p-2 my-2 border-2' placeholder='Eg : 3' required /><br/><br/>
          <text>Type all Productions <b>( Each production in new line )</b></text>
          <textarea name='ps' rows={2} type='text' className='w-full p-2 border-2 my-2' placeholder='eg -> S->abc \n S->def \n S->ghi' required />
          <br/><br/><br/>
          
          <text>Enter Starting Symbol ( Sigle Character )</text>
          <input name='start' type='text' maxLength={1} className='w-full p-2 my-2 border-2' placeholder='Eg : S' required />
          
          <button type='submit' className='self-center bg-gray-900 text-white font-bold px-6 py-2 my-20 rounded-sm hover:bg-gray-700 w-full'>Calculate</button>
        </form>
        <div className='output text-center my-20 text-gray-800 text-xl '>
          <div className='text-xl my-10 font-extrabold'>Output</div>
          <div className='bg-blue-100 p-8'>
          {data.map((item, index) => {
            return <pre className='font-bold' key={index}>{item}</pre>
          })}
          </div>
        </div>
      </div>
      <div className='bg-gray-200 text-center font-bold py-20 text-gray-800'>
        Submitted by - Shubham garg and  Saumya Jain<br/>
        Enrollment No. - A2305219420 and A2305219423<br/>
        Section - 6 CSE 6Y <br/>
        Submitted to - Prabhishek Sharma
      </div>
    </div>
  )
}

export default App
