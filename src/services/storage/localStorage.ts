const storage =
  typeof window !== 'undefined' && window.localStorage
    ? window.localStorage
    : {
        setItem: (key: string, value: string) =>
          console.log(
            `Setting in SSR for localStorage with key: ${key}, value: ${value}`
          ),
        getItem: (key: string) =>
          console.log(`Fetching in SSR for localStorage with key: ${key}`),
        removeItem: (key: string) =>
          console.log(`Removing in SSR for localStorage with key: ${key}`),
      }

export default storage
