import { useEffect, useState } from 'react';

const localStorageKey = "picoPreferredColorScheme"

const ThemeIcon = () => {
    const [scheme, setScheme] = useState("")

    useEffect(() => {
      document.querySelector('HTML')!.setAttribute('data-theme', scheme)
    //   if (possibleScheme != "dark" && possibleScheme != "light") {
    //     return
    // }

      window.localStorage.setItem(localStorageKey, scheme)

    console.log(window.localStorage)
    }, [scheme])
    
    useEffect(() => {
        //проверяем сохранена ли тема в localStorage
      const possibleScheme = window.localStorage.getItem(localStorageKey) 
      if (possibleScheme != "dark" && possibleScheme != "light") {
        matchColorTheme()
      } else {
        setScheme(possibleScheme)
      }
    },[])
  
    function matchColorTheme() {
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
      if (darkThemeMq.matches) {
        setScheme('dark')
      } else {
        setScheme('light')
      }
    }
  
    function changeTheme() {
      if (scheme == 'dark') {
        setScheme('light')
      } else {
        setScheme('dark')
      }
    }
    

  return (
    <button 
    className="theme-icon-container"
    style={{
        cursor: "pointer",
        display: "inline-block",
        // background: scheme=="dark"? '#ffffff' : '#000000'
        padding: "0.2em"
        }}
    onClick={changeTheme}
    >
        Сменить тему
    </button>
  );
};

export default ThemeIcon;