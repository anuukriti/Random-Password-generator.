import { useState, useCallback, useEffect, useRef } from "react";

function App() {
    const [length, setLength] = useState("5");
    const [numAllowed, setNumAllowed] = useState(false);
    const [sCharAllowed, setSCharAllowed] = useState(false);
    const [password, setPassword] = useState("");

    const passwordRef = useRef(null);

    const passGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (numAllowed) str += "0123456789";
        if (sCharAllowed) str += "~!@#$%^&*_+{}[]<>?";
        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char);
        }
        setPassword(pass);
    }, [length, numAllowed, sCharAllowed, setPassword]);

    const copyPasswordToClipboard = useCallback(() => {
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password);
    }, [password]);

    useEffect(() => {
        passGenerator();
    }, [length, numAllowed, sCharAllowed, passGenerator]);

    return (
        <>
            <div className="flex items-center pt-20 flex-col py-2 px-2 h-screen w-full">
                <h1 className="text-white text-3xl md:text-6xl p-5 pt-10 text-center font-bold mb-10">
                    Random Password Generator
                </h1>
                <div className="w-full max-w-4xl h-auto mt-3 mb-2 pt-20 pb-10 rounded-lg shadow-3xl bg-gray-500/30 border">
                    <div className="flex justify-center mx-5">
                        <input
                            type="text"
                            value={password}
                            placeholder="Password"
                            readOnly
                            ref={passwordRef}
                            className="rounded-xl outline-none py-4 px-6 rounded-r-none w-full md:max-w-xl max-w-sm text-blue-700 text-lg font-sans font-semibold"
                        />
                        <button
                            onClick={copyPasswordToClipboard}
                            className="text-white font-semibold py-4 px-6 bg-blue-400 rounded-xl rounded-l-none text-lg hover:bg-blue-800 cursor-pointer"
                        >
                            Copy
                        </button>
                    </div>
                    <div className=" p-2 mt-11 block  md:flex gap-20 flex-wrap items-center justify-center">
                        <div className="flex items-center ml-10 md:ml-0 gap-x-2 ">
                            <input
                                type="range"
                                min={6}
                                max={100}
                                value={length}
                                className="cursor-pointer"
                                onChange={(e) => {
                                    setLength(e.target.value);
                                }}
                            />
                            <label className="text-blue-800 font-semibold">
                                Length: {length}
                            </label>
                        </div>
                        <div className="flex items-center ml-10 md:ml-0 gap-x-2 ">
                            <input
                                type="checkbox"
                                defaultChecked={numAllowed}
                                onChange={() => {
                                    setNumAllowed((prev) => !prev);
                                }}
                            />
                            <label className="text-blue-800 font-semibold">
                                Number
                            </label>
                        </div>
                        <div className="flex items-center ml-10 md:ml-0 gap-x-2 ">
                            <input
                                type="checkbox"
                                defaultChecked={sCharAllowed}
                                onChange={() => {
                                    setSCharAllowed((prev) => !prev);
                                }}
                            />
                            <label className="text-blue-800 font-semibold">
                                Special character
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
