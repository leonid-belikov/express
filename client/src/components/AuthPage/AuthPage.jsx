import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {authorization, register} from "../../redux/actions/userActions";

import {Pane, Card, Heading, Button, Paragraph, TextInput, Tooltip, defaultTheme} from "evergreen-ui";
import ErrorsPane from "./ErrorsPane";

class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerFormData: {
                name: '',
                email: '',
                password: '',
                confirm: '',
            },
            authFormData: {
                name: '',
                password: '',
            },
            showRegistrationForm: false,
        }
    }

    showRegistrationForm() {
        this.setState({
            ...this.state,
            showRegistrationForm: true,
        })
    }

    showAuthForm() {
        this.setState({
            ...this.state,
            showRegistrationForm: false,
        })
    }

    handleRegisterInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            ...this.state,
            registerFormData: {
                ...this.state.registerFormData,
                [name]: value
            }
        })
    }

    handleAuthInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            ...this.state,
            authFormData: {
                ...this.state.authFormData,
                [name]: value
            }
        })
    }

    async handleRegisterBtnClick() {
        await this.props.register(this.state.registerFormData);
        const errors = this.props.registerErrors;
        for (const key in errors) {
            if (!!errors[key].length) return;
        }
        this.props.history.push('/');
    }

    async handleAuthBtnClick() {
        await this.props.authorization(this.state.authFormData);
        let hasErrors = false;
        for (const key in this.props.authErrors) {
            if (!!this.props.authErrors[key].length) {
                hasErrors = true;
                break;
            }
        }
        if (hasErrors || this.props.authFailed) return;
        this.props.history.push('/');
    }

    getErrorList(errorsArray) {
        const list = errorsArray.map((msg, index) => <Paragraph
            key={index}
            paddingTop={5}
            size={300}
            color={defaultTheme.palette.red.base}>
            - {msg}
        </Paragraph>)
        return <>
            {list}
        </>
    }

    getCardContent() {
        if (this.state.showRegistrationForm) {
            return <>
                <Pane
                    marginBottom={10}>
                    <Heading
                        size={900}
                        textAlign='center'
                        marginBottom={15}>
                        Регистрация
                    </Heading>
                    <Paragraph
                        color='muted'>
                        Для регистрации необходимо заполнить все поля:
                    </Paragraph>
                </Pane>
                <Pane
                    display='flex'
                    justifyContent='space-between'
                    alignItems='flex-start'
                    flexWrap='wrap'>
                    <Tooltip content={<>
                        <Paragraph size={300} marginBottom={5}>
                            - Имя должно состоять из символов латинского алфавита
                        </Paragraph>
                        <Paragraph size={300}>
                            - Минимальная длина имени 3 символа
                        </Paragraph>
                    </>}
                             appearance='card'>
                        <TextInput
                            name='name'
                            isInvalid={!!this.props.registerErrors.name.length}
                            width={240}
                            placeholder='Имя пользователя'
                            value={this.state.registerFormData.name}
                            onChange={this.handleRegisterInputChange.bind(this)}/>
                    </Tooltip>
                    <TextInput
                        name='email'
                        isInvalid={!!this.props.registerErrors.email.length}
                        width={240}
                        placeholder='Адрес электронной почты'
                        value={this.state.registerFormData.email}
                        onChange={this.handleRegisterInputChange.bind(this)}/>
                    <ErrorsPane
                        colWidth={240}
                        leftColContent={this.getErrorList(this.props.registerErrors.name)}
                        rightColContent={this.getErrorList(this.props.registerErrors.email)}
                    />
                    <Tooltip content={<>
                        <Paragraph size={300} marginBottom={5}>
                            - Пароль должен состоять из символов латинского алфавита или цифр
                        </Paragraph>
                        <Paragraph size={300}>
                            - Минимальная длина пароля 8 символов
                        </Paragraph>
                    </>}
                             appearance='card'>
                        <TextInput
                            name='password'
                            type='password'
                            isInvalid={!!this.props.registerErrors.password.length}
                            width={240}
                            placeholder='Пароль'
                            value={this.state.registerFormData.password}
                            onChange={this.handleRegisterInputChange.bind(this)}/>
                    </Tooltip>
                    <TextInput
                        name='confirm'
                        type='password'
                        isInvalid={!!this.props.registerErrors.confirm.length}
                        width={240}
                        placeholder='Повторите пароль'
                        value={this.state.registerFormData.confirm}
                        onChange={this.handleRegisterInputChange.bind(this)}/>
                    <ErrorsPane
                        colWidth={240}
                        leftColContent={this.getErrorList(this.props.registerErrors.password)}
                        rightColContent={this.getErrorList(this.props.registerErrors.confirm)}
                    />
                </Pane>
                <Pane
                    display='flex'
                    justifyContent='center'
                    marginBottom={25}>
                    <Button
                        display='flex'
                        justifyContent='center'
                        height={40}
                        width={160}
                        appearance="primary"
                        iconAfter="key-enter"
                        onClick={this.handleRegisterBtnClick.bind(this)}>
                        Отправить
                    </Button>
                </Pane>
                <Pane
                    display='flex'>
                    <Paragraph
                        color='muted'
                        lineHeight='32px'>
                        Если Вы уже зарегистрированы, Вам необходимо
                    </Paragraph>
                    <Button
                        appearance="minimal"
                        fontSize={14}
                        paddingX={5}
                        marginLeft={3}
                        onClick={this.showAuthForm.bind(this)}>
                        войти
                    </Button>
                </Pane>
            </>
        } else {
            return <>
                <Pane
                    marginBottom={10}>
                    <Heading
                        size={900}
                        textAlign='center'
                        marginBottom={15}>
                        Авторизация
                    </Heading>
                    <Paragraph
                        color='muted'>
                        Для входа на сайт необходимо авторизоваться:
                    </Paragraph>
                </Pane>
                <Pane
                    height={60}
                    marginBottom={20}
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    flexWrap='wrap'>
                    <TextInput
                        width={240}
                        name='name'
                        placeholder='Имя пользователя'
                        value={this.state.authFormData.name}
                        isInvalid={!!this.props.authErrors.name.length}
                        onChange={this.handleAuthInputChange.bind(this)}
                    />
                    <TextInput
                        type='password'
                        name='password'
                        width={240}
                        placeholder='Пароль'
                        value={this.state.authFormData.password}
                        isInvalid={!!this.props.authErrors.password.length}
                        onChange={this.handleAuthInputChange.bind(this)}
                    />
                    <ErrorsPane
                        colWidth={240}
                        leftColContent={this.getErrorList(this.props.authErrors.name)}
                        rightColContent={this.getErrorList(this.props.authErrors.password)}
                    />
                </Pane>
                <Pane
                    display='flex'
                    justifyContent='center'
                    marginBottom={25}>
                    <Button
                        display='flex'
                        justifyContent='center'
                        height={40}
                        width={160}
                        appearance="primary"
                        iconAfter="key-enter"
                        onClick={this.handleAuthBtnClick.bind(this)}>
                        Вход
                    </Button>
                </Pane>
                <Pane
                    display='flex'>
                    <Paragraph
                        color='muted'
                        lineHeight='32px'>
                        Если Вы впервые на этом сайте, для входа необходима
                    </Paragraph>
                    <Button
                        appearance="minimal"
                        fontSize={14}
                        paddingX={5}
                        marginLeft={3}
                        onClick={this.showRegistrationForm.bind(this)}>
                        регистрация
                    </Button>
                </Pane>
            </>
        }
    }

    render() {
        return (
            <Pane
                width='100%'
                display='flex'
                justifyContent='center'
                alignItems='flex-start'>
                <Card
                    width={600}
                    marginTop={150}
                    paddingY={25}
                    paddingX={50}
                    elevation={3}
                    background='white'>
                    {this.getCardContent()}
                </Card>
            </Pane>
        )
    }

}

export default connect(
    state => ({
        user: state.userData.user,
        registerErrors: state.userData.registerErrors,
        authErrors: state.userData.authErrors,
        authFailed: state.userData.authFailed,
    }),
    dispatch => ({
        register: async data => {
            await dispatch(register(data))
        },
        authorization: async data => {
            await dispatch(authorization(data))
        },
    })
)(withRouter(AuthPage));
