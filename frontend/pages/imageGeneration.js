import { useState } from "react";
import Image from "next/image";
import axios from "axios";

export default function imageGeneration(props) {
    const [image, updateImage] = useState();
    const [prompt, updatePrompt] = useState();
    const [loading, updateLoading] = useState();

    const generateImage = async (prompt) => {
        updateLoading(true);
        const result = await axios.get(`http://127.0.0.1:8000/?prompt=${prompt}`);
        updateImage(result.data);
    }

    return (
        <div className='flex flex-col items-center'>
            <div className="flex w-1/2 mt-20 mb-10">
                <textarea
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    style={{resize: 'none'}}
                    placeholder="Prompt"
                    value={prompt}
                    onChange={e => updatePrompt(e.target.value)}
                    onKeyDown={(event) => {
                        if (event.keyCode === 13) {
                            event.preventDefault();
                        }
                    }}
                />
                <button
                    type="button"
                    className="ml-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={(e) => generateImage(prompt)}
                >
                    Generate
                </button>
            </div>
            <div className='w-3/5 border rounded bg-zinc-200'>
                <div className='m-3 border h-[50vh] bg-white'>
                    image here
                </div>

                {/*  edit section  */}
                <div className={'w-full my-5 mx-6'}>
                    <div className={'mb-2'}>
                        <label className={'text-sm'}>Sampling Method</label>
                        <select className={'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-1/2 px-1 py-2'}>
                            <option>option 1</option>
                            <option>option 2</option>
                        </select>
                    </div>
                    <div>
                        <label className={'text-sm'}>Width</label>
                        <br/>
                        <input
                            type="range"
                            className="w-1/2 h-2 bg-white rounded-lg appearance-none cursor-pointer"
                            onChange={()=>{}}
                        />
                    </div>
                    <div>
                        <label className={'text-sm'}>Height</label>
                        <br/>
                        <input
                            type="range"
                            className="w-1/2 h-2 bg-white rounded-lg appearance-none cursor-pointer"
                            onChange={()=>{}}
                        />
                    </div>
                </div>
            </div>

        {loading ? (
            <div>
                <svg aria-hidden="true"
                     className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"/>
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        ) : image ? (
            <Image src={`data:image/png;base64,${image}`} boxShadow="lg" />
        ) : null}
        </div>
    )
}
