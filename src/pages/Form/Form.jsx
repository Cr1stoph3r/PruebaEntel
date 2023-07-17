import './Form.css'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import useIsSmallScreen from '../../hooks/useIsSmallScreen';

import useRutValidation from '../../hooks/useRutValidation';

import FormImg from '../../assets/Formulario.svg'
import StyledInputForm from '../../components/styled_components/StyledInputForm'
import StyledSelectForm from '../../components/styled_components/StyledSelectForm'
import StyledButtonForm from '../../components/styled_components/StyledButtonForm'
import StyledSnackbar from '../../components/styled_components/StyledSnackBar';

const Form = () => {
    const isSmallScreen = useIsSmallScreen();

    const {validateRut, formatRut} = useRutValidation();

    const [snackbar, setSnackbar] = useState({ message: '', status: '' });

    const showSnackbar = (message, status) => {
      setSnackbar({ message, status });

      setTimeout(() => {
        setSnackbar({ message: '', status: '' });
      }, 3000);
    };
    
    // validation form
    const NewDataSchema = Yup.object().shape({
        name: Yup.string().required('Nombre es requerido'),
        rut: Yup.string()
        .required('Rut es requerido')
        .test('Validar RUT', 'Rut inválido', (value) => validateRut(value)),
        patent: Yup.string().required('Patente es requerida').min(6, 'Patente invalida').max(6, 'Patente invalida'),
        vehicle_brands: Yup.number().nullable().transform((value, originalValue) => originalValue === '' ? null : value).required('Marca es requerida'),
        vehicle_models: Yup.number().nullable().transform((value, originalValue) => originalValue === '' ? null : value).required('Modelo es requerida'),
        vehicle_color: Yup.string().required('Color es requerido'),
        price: Yup.number().nullable().transform((value, originalValue) => originalValue === '' || originalValue === null ? null : value).min(0, 'El precio debe ser mayor a 0').required('Precio es requerido')
    });

      const defaultValues = {
          name: "",
          rut: "",
          patent: "",
          vehicle_brands: "",
          vehicle_models: "",
          vehicle_color: "",
          price: ""
      };
    
      const methods = useForm({
        resolver: yupResolver(NewDataSchema),
        defaultValues,
      });
    
      const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit,
      } = methods;
    
      const values = watch();

    // get data for select
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    
    useEffect(() => {
        const vehicle_brands = JSON.parse(localStorage.getItem('vehicle_brands') || '[]');
        const vehicle_models = JSON.parse(localStorage.getItem('vehicle_models') || '[]');
        setBrands(vehicle_brands);
        setModels(vehicle_models);
      }, []);
      useEffect(() => {
        setValue('vehicle_models', '');
    }, [setValue])

    const onSubmit = (data) =>{
        try{
            let formList = localStorage.getItem('form_list');
            
            if (!formList) {
              formList = '[]';
            }

            formList = JSON.parse(formList);

            if(formList.some(item => item.patent === data.patent)) throw new Error('La patente ya está registrada');
            data.rut = formatRut(data?.rut);
            formList.push(data);
        
            localStorage.setItem('form_list', JSON.stringify(formList));
            
            showSnackbar('Formulario guardado con exito!', 'success')

            reset(defaultValues);
        }catch (e){
            showSnackbar(e.message, 'error')
        }
    }

    return (
    <>
    {snackbar.message && <StyledSnackbar message={snackbar.message} status={snackbar.status} />}
    {/* Header form */}
    <div className='container-head-form'>
        <div className='head-form'>
            <div className='container-head-text'><h1><span className='h1-span'>Formulario </span><strong>de Prueba</strong></h1></div>
            <div className='container-head-img'><img src={FormImg} alt='Imagen Formulario Prueba'/></div>
        </div>
    </div>
    <hr/>
    {/* Body form */}
    <div className='container-body-form'>
        <div className='section-body-form'>
            <div className='head-body-form'>
                <h2>Nuevo formulario</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the bed industry&apos;s standard dummy text ever since.</p>
            </div>
            <FormProvider {...methods}>
                <form className='form' onSubmit={handleSubmit(onSubmit)}>
                    <div className='section-form-seller'>
                        <h3>Datos del vendedor:</h3>
                        <div className='grid-form-seller'>
                            <Controller
                              name={'name'}
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                  <StyledInputForm
                                  {...field}
                                   label='Nombre completo' 
                                   required 
                                   colSpan={isSmallScreen ? 1 : 2}
                                   error={error}
                                   />
                              )}
                            />
                            <Controller 
                              name={'rut'}
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                  <StyledInputForm
                                    {...field}
                                    error={error}
                                    label='Rut Vendedor'
                                    required colSpan={1}
                                    value={formatRut(values?.rut)}
                                    />
                              )}/>
                        </div>
                        <hr/>
                    </div>
                    <div className="section-form-vehicle">
                        <h3>Datos del vehiculo:</h3>
                        <div className="grid-form-vehicle">
                            <Controller 
                              name={'patent'}
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                  <StyledInputForm {...field} error={error} label='Patente del vehiculo' required />
                              )}
                            />
                            <Controller 
                              name={'vehicle_brands'}
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                    <StyledSelectForm {...field} error={error} label= 'Marca del vehiculo' required >
                                        <option value=""></option>
                                        {brands.map((brand, i) => <option key={i} value={brand.id}>{brand.brand}</option>)}
                                    </StyledSelectForm>
                              )}/>
                              <Controller 
                              name={'vehicle_models'}
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                    <StyledSelectForm {...field} error={error} label='Modelo del vehiculo' required >
                                        <option value=""></option>
                                        {models.filter(model => model.BrandId.toString() === values.vehicle_brands.toString()).map((model, i) => <option key={i} value={model.id}>{model.model}</option>)}
                                    </StyledSelectForm>
                              )}/>
                              <Controller 
                              name={'vehicle_color'}
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                  <StyledInputForm {...field} error={error} label='Color del vehiculo' required type='Text' />
                              )}/>
                              <Controller 
                              name={'price'}
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                  <StyledInputForm {...field} error={error} label='Precio del vehiculo' required type='number' />
                              )}/>
                        </div>
                    </div>
                    <hr/>
                    <div className='button-form'>
                        <StyledButtonForm type='submit'>
                            Enviar
                        </StyledButtonForm>
                    </div>
                </form>
            </FormProvider>
        </div>
    </div>
    </>
)
}

export default Form