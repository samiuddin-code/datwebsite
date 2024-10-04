module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    groupLevel: 10,
    groupScope: "scope",
    groupVariants: ["hover", "focus"],
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'tiny': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
      '8xl': '6rem',
      '9xl': '7rem'
    },
    zIndex: {
      '0': 0,
      '10': 10,
      '20': 20,
      '30': 30,
      '40': 40,
      '50': 50,
      '25': 25,
      '50': 50,
      '75': 75,
      '100': 100,
      'auto': 'auto',
    },
    colors: {
      white:'#ffffff',
      gray: {
        50:"#E8E9E9",
        100:"#D2D3D3",
        200:"#BBBDBC",
        300:"#A4A7A6",
        400:"#8E9190",
        500:"#777B7A",
        600:"#606564",
        700:"#494F4D",
        800:"#333937",
        900:"#1C2321",
      },
      green:{
        50: "#E7F1ED",
        100: "#D0E4DB",
        200: "#B8D6C8",
        300: "#A1C9B6",
        400: "#89BBA4",
        500: "#71AD92",
        600: "#5AA080",
        700: "#42926D",
        800: "#2B855B",
        900: "#137749",
      }
    },
    extend: {
      inset: {
        'btn-inset': 'calc(100% - 16px)',
      },
      fontFamily: {
          sans: ['IBM Plex Sans', 'sans-serif'],
      },
      animation: {
        'ping-once': 'pingOnce 1000ms cubic-bezier(.17,.67,.53,.78) both',
        'ping-once-reverse': 'pingOnceReverse 1000ms cubic-bezier(.17,.67,.53,.78) both',
        'skew-nav':'skewNav 300ms cubic-bezier(.17,.67,.53,.78) 500ms both',
        'skew-nav-reverse':'skewNavReverse 300ms cubic-bezier(.17,.67,.53,.78) 500ms both',
        'to-top':'toTop 600ms cubic-bezier(.17,.67,.53,.78) both',
        'from-top':'fromTop 600ms cubic-bezier(.17,.67,.53,.78) both',
        'left-right' : 'leftRight 600ms cubic-bezier(.17,.67,.53,.78) infinite both'
      },
      keyframes: {
        pingOnce: {
          'from': { transform: 'scale(0) translateX(50%) translateY(-50%)' },
          'to': { transform: 'scale(2) translateX(50%) translateY(-50%)' },
        },
        pingOnceReverse: {
          'from': { transform: 'scale(2) translateX(50%) translateY(-50%)' },
          'to': { transform: 'scale(0) translateX(50%) translateY(-50%)' },
        },
        skewNav: {
          'from': {transform:'skew(-12deg) translateX(130%)'},
          'to': {transform:'skew(0deg) translateX(0)'},
        },
        skewNavReverse: {
          'from': {transform:'skew(0deg) translateX(0)'},
          'to': {transform:'skew(-12deg) translateX(130%)'},
        },
        toTop:{
          'from':{top:'5rem',opacity:'0%'},
          'to':{top:'0',opacity:'100%'}
        },
        fromTop:{
          'from':{top:'-100%',opacity:'0%'},
          'to':{top:'2rem',opacity:'100%'}
        },
        leftRight:{
          '0%':{right:'48px'},
          '50%':{right:'24px'},
          '100%':{right:'48px'},
        }
      },
      transitionTimingFunction: {
        'custom-transition': 'cubic-bezier(.17,.67,.53,.78)',
       }
    },
  },
  variants: {
    extend: {
      padding: ['first','last'],
      margin: ['first','last'],
      backgroundColor: ['first','hover'],
      textColor: ['first'],
      outline: ['active','focus'],
      position: ['first','last'],
      opacity: ['responsive', 'hover', 'focus', 'disabled'],
      borderRadius: ['hover', 'focus'],
      height:['responsive','hover','group-hover'],
      border:['last',"first"]
    }
  },
  plugins: [
    require("tailwindcss-nested-groups"),
  ],
}
