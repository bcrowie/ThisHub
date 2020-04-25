import {useEffect, useState} from 'react'
import axios from 'axios'

export const useAuthentication = () => {
    const [auth, setAuth] = useState({Username: null, Token: null})

    useEffect(() => {
      const Token = localStorage.getItem('thishub.token')
      const Username = localStorage.getItem('thishub.user')

      const fetchAuth = async () => {
        const res = await axios.post('/users/auth', { Username }, {
          headers: { Authorization: Token }
        })

        if(res){
          setAuth({Username: res.data.Username, Token})
        }
      }
      
      if(Token && Username) fetchAuth()
    }, [])

    return auth
}