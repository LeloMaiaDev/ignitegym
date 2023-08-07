import { useNavigation } from '@react-navigation/native';
import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

type FormDataProps = {
    email: string;
    password: string;
}

const signUpSchema = yup.object({
    email: yup.string().required('Informe seu e-mail.').email('E-mail inválido'),
    password: yup.string().required('Informe sua senha.').min(6, 'A senha deve ter, no mínimo, 6 dígitos.')
});

export function SignIn(){

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signUpSchema),
    });

    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    function handleNewAccount(){
        navigation.navigate('signUp')
    }

    function handleSignUp({ email, password }: FormDataProps) {
        console.log({ email, password})
    }

    function handleGoBack(){
        navigation.goBack();
    }

    return(
        <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}
        >
            <VStack flex={1} px={10} pb={16}>
                <Image
                    source={BackgroundImg}
                    defaultSource={BackgroundImg}
                    alt='Pessoas treinando'
                    resizeMode='contain'
                    position='absolute'
                />
                <Center
                    my={24}
                >
                    <LogoSvg />
                    <Text
                        color='gray.100'
                        fontSize='sm'
                    >
                        Treine sua mente e o seu corpo
                    </Text>
                </Center>

                <Center flex={1}>
                    <Heading
                        color='gray.100'
                        fontSize='xl'
                        mb={6}
                        fontFamily='heading'
                    >
                        Crie sua conta
                    </Heading>
                    
                    <Controller
                        control={control}
                        name='email'
                        render={({ field: {onChange, value} }) => (
                            <Input
                                placeholder='E-mail'
                                keyboardType='email-address'
                                autoCapitalize='none'
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />
                    
                    <Controller
                        control={control}
                        name='password'
                        rules={{
                            required: 'Informe a senha.'
                        }}
                        render={({ field: {onChange, value} }) => (
                            <Input
                                placeholder='Senha'
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />
                    <Button
                        title='Acessar'
                        onPress={handleSubmit(handleSignUp)}
                    />
                </Center>
                <Center mt={24}>
                    <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
                        Ainda não tem acesso?
                    </Text>
                    <Button 
                        title="Criar Conta" 
                        variant="outline"
                        onPress={handleNewAccount}
                    />
                </Center>
            </VStack>
        </ScrollView>
    );
}