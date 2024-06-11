import { useState } from 'react';
import axios from 'axios';

function LoginForm(props) {
    const { styleData, setIsLoggedIn, setName } = props;

    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');

    const onClickBtn = async() => {
        if (!id && !pwd) {
          alert('아이디, 비밀번호를 입력하세요.');
          return;
        }
        if (!id) {
            alert('ID를 입력하세요.');
            return;
        }
        if (!pwd) {
            alert('비밀번호를 입력하세요.');
            return;
        }
        if (pwd.length < 4) {
            alert('비밀번호를 4자리 이상 입력하세요.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/token/login', { id, pwd });
            const { token, name } = response.data;
            localStorage.setItem('jwt', token);
            setName(name);
            setIsLoggedIn(true);
            alert('로그인 성공! 토큰이 저장되었습니다.');
        } 
        catch (error) {
            console.log(error);
            alert('로그인 실패: 아이디 또는 비밀번호가 일치하지 않습니다.');
        }
    };

    console.log(`Login render, ${id}, ${pwd}`);
    return (
        // CSS 색상수정 코드
        <div style={styleData}>  
            <h2>Login</h2>
            <input type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
            <input type="password" placeholder="Password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
            <button onClick={onClickBtn}>로그인</button>
        </div>
    )
}     

  export default LoginForm;