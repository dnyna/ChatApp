import { createContext, useState } from "react" // createContext creates global datastorage


export const ThemeToggleContex = createContext()  // creates context objext by using which we can shre data across all , avoids prop drilling


const ThemeContext = ({ children }) => {
    const [mode, setMode] = useState(false) // stores current theme mode false means light mode

    //it changes theme mode
    const ToggleTheme = () => {
        setMode(!mode) // false becomes true 
        // and true becomes false
    };

    const Theme = {  // it stopres theme color
        backgroundColor: mode ? 'black' : 'white',
        color: mode ? 'white' : 'black', //text color changes based on the  modes
        userContainerColor: mode ? '#bdbbbb' : 'white',  // card color changes based on modes

    }


    return (
        <ThemeToggleContex.Provider
            value={{
                Theme,
                mode,
                ToggleTheme
            }}>
            {children}
        </ThemeToggleContex.Provider>
    )
}

export default ThemeContext