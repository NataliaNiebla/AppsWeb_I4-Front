import { useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext'; // Ajusta la ruta según tu estructura de carpetas

interface LoginData {
    email: string;
    password: string;
    rememberMe: boolean;
}

interface Role {
    _id: string;
    name: string;
    description?: string;    
}

function Login() {

  const [form] = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
            console.log(values)
 // Valida los campos del formulario
      const response = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }

      const data = await response.json();
        login(data.accessToken, data.user, values.rememberMe ?? false); // Llama a la función login con el token
      navigate('/'); // Redirige al Dashboard
      form.resetFields(); // Resetea los campos del formulario
    } catch (error) {
      console.log('Error en el servidor:', error);
      form.setFields([
        {
          name: 'email',
          errors: ['Error al iniciar sesión. Verifica tus credenciales.'],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Iniciar Sesión</h1>
        <Form
          form={form}
          name="login"
          onFinish={handleSubmit}
          layout="vertical"
          className="login-form"
        >
          <Form.Item
            label="Correo"
            name="email"
            rules={[
              { required: true, message: 'Por favor ingresa tu correo' },
              { type: 'email', message: 'Por favor ingresa un correo válido' },
            ]}
          >
            <Input className="login-input" placeholder="Ingresa tu correo" disabled={loading} />
          </Form.Item>
          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
          >
            <Input.Password className="login-input" placeholder="Ingresa tu contraseña" disabled={loading} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={`login-button ${loading ? 'loading' : ''}`}
              block
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;