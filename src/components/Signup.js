import React, { useState } from 'react';
import axios from 'axios';
import './signupStyle.css';
import CatResponse from './CatResponse';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Upload, } from 'antd';
import Archivos3 from './Archivos3';
function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false); // Agregamos estado para manejar el éxito
  const [url_img, setImg] = useState("");


  //Cargar imagen
  const channgeUploadImage = async (e) =>{
    const file = e.target.files[0];
    console.log(e);

const data = new FormData();
data.append("file", file);
data.append("upload_preset", "parcial_proyecto");
const preset = "https://api.cloudinary.com/v1_1/dzli6ozmk/image/upload"
const response = await axios.post(
    preset, 
    data
)
console.log(response.data.public_id)
setImg(response.data.secure_url)

}   

  const onFinish = async (values) => {

    
    console.log('Obteniendo data:', values);
    setLoading(true); // Mostrar mensaje de carga mientras se realiza la solicitud
    try {
        //Si selecciono data: 
        if(values.Upload != null){
          //Envio la imagen
          const data = new FormData();
          data.append("file", values.Upload[0].originFileObj);
          data.append("upload_preset", "parcial_proyecto");
          const preset = "https://api.cloudinary.com/v1_1/dzli6ozmk/image/upload"
          const response = await axios.post(
              preset, 
              data
          )
          console.log(response.data.public_id)
          setImg(response.data.public_id);

        } else{
          setImg("images_parcial/wqbug8ny7jorbkixu9x8");
          
        }



      const Apiurl = 'http://localhost:8000/usuarios';
      await axios.post(Apiurl, {
        nombre: values.nombre,
        contraseña: values.contraseña
      });
      console.log("Bien hecho ya tenemos tus datos");
      setSuccess(true); // Establecer éxito como verdadero
      setLoading(false); // Finaliza la carga después de que se completa la solicitud
      setError(false);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      setError(true);
      setSuccess(false);
      setLoading(false);
      setTimeout(() => {
        setError(false);
      }, 5000); // Ocultar el mensaje de error después de 5 segundos
      console.error('Error en la solicitud:', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
  setError(true);
  setSuccess(false); // Asegúrate de que el éxito se establezca en falso en caso de fallo
  setLoading(false);
  console.log('Failed:', errorInfo);
};

  return (
    <>
      {loading && <p>Cargando...</p>}
      {success &&<  CatResponse status={"success"} message={"Correcto"}></CatResponse>}
      {/* {error && < CatResponse status={"failed"} message={"Mal"}></CatResponse>} */}

      {error && <CatResponse key="error" status={"failed"} message={"Mal"}></CatResponse>}

      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        className="signupStyle"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nombre"
          name="nombre"
          rules={[
            {
              required: true,
              message: 'Por favor ingresa tu nombre!',
            },
          ]}
        >
          <Input className="input-input" />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="contraseña"
          rules={[
            {
              required: true,
              message: 'Por favor ingresa tu contraseña!',
            },
          ]}
        >
          <Input.Password className="password-input" />
        </Form.Item>
        
        <Form.Item label="Upload">
          

          <Upload onChange={channgeUploadImage} listType="picture-card">
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </Upload>

        </Form.Item>


        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox >Recordarme</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" id="button-send" >
            Registrarse
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default App;
