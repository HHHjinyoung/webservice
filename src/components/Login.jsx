import { useState } from 'react';
import axios from 'axios';

function Login() {
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    const [name, setName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 추가


        const onClickBtn = async() => {
            try {
              if (!pwd) {
                isLoggedIn.push("비밀번호를 입력하세요.");
            } else if (pwd.length < 4) {
              isLoggedIn.push("비밀번호는 4자리 이상 입력하세요.");
            }
              alert('로그인 성공! 토큰이 저장되었습니다.');
            } catch (error) {
              alert('로그인 실패: ' + error);
            }
              const response = await axios.post('http://localhost:3000/token/login', { id, pwd });
              const { token, userName } = response.data;
              localStorage.setItem('jwt', token);
              setIsLoggedIn(true); // 추가
              setName(userName);
        
          };

          const noClickBtn = async() => {
  
              localStorage.removeItem('jwt');
              setIsLoggedIn(false);
              alert('로그아웃 되었습니다.');
          };

    console.log('Login render, ${id}, ${pwd}' );
    return (
      <div>
      {isLoggedIn ? (
        <div>
          <h2>{name}님. 환영합니다!</h2>
          <button onClick={noClickBtn}>로그아웃</button>
          
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        
          
          <button onClick={onClickBtn}>로그인 하기</button>
        </div>
        
      )}     
    </div>
    );
  }
  
  export default Login;