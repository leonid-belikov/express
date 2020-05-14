import React, {Component} from 'react';
import {Card, Pane, Heading, Paragraph, defaultTheme, Icon, Avatar} from 'evergreen-ui'

class GroupCard extends Component {

    render() {

        const data = this.props.data;

        return <Card
            key={data._id}
            elevation={3}
            width={350}
            marginRight={25}
            marginBottom={25}>
            <Pane
                paddingTop={24}
                paddingBottom={16}
                paddingX={25}
                background={defaultTheme.palette.blue.light}
                borderTopRightRadius={5}
                borderTopLeftRadius={5}>
                <Heading
                    size={600}
                    marginBottom={10}>
                    {data.name}
                </Heading>
                <Paragraph
                    size={400}
                    overflow='hidden'
                    color='muted'
                    textOverflow='ellipsis'>
                    {data.description}
                </Paragraph>
            </Pane>
            <Pane
                paddingTop={15}
                paddingBottom={20}
                paddingX={25}>
                <Pane
                    display='flex'
                    borderColor={defaultTheme.colors.border.muted}
                    borderBottom='1px solid'
                    marginBottom={20}>
                    {!!data.users.length && <Pane
                        flexGrow={1}
                        marginBottom={16}>
                        <Pane
                            display='flex'
                            paddingTop={1}
                            marginBottom={12}>
                            <Icon
                                icon='people'
                                marginRight={10}
                                color={defaultTheme.colors.text.default}
                            />
                            <Heading
                                size={300}
                                marginTop={3}>
                                Участники
                            </Heading>
                        </Pane>
                        {data.users.map(user => {
                            return <Avatar
                                isSolid
                                key={user._id}
                                name={user.name}
                            />
                        })}
                    </Pane>}
                    {!!data.invited.length && <Pane
                        flexGrow={1}
                        marginBottom={10}>
                        <Pane
                            display='flex'
                            marginBottom={12}>
                            <Icon
                                icon='new-person'
                                marginRight={10}
                                color={defaultTheme.colors.text.default}
                            />
                            <Heading
                                marginTop={4}
                                size={300}>
                                Приглашенные
                            </Heading>
                        </Pane>
                        {data.invited.map(user => {
                            return <Avatar
                                marginRight={6}
                                key={user._id}
                                name={user.name}
                            />
                        })}
                    </Pane>}
                </Pane>
                <Pane>
                    <Pane
                        display='flex'
                        marginBottom={12}>
                        <Icon
                            color={defaultTheme.colors.text.default}
                            icon='bank-account'
                            marginRight={10}
                        />
                        <Heading
                            size={300}
                            marginTop={3}>
                            Счета
                        </Heading>
                    </Pane>
                    {data.accounts.map(account => <Paragraph
                        key={account.name}
                        className='text-ellipsis'
                        color='muted'
                        size={300}>
                        {account.name}
                    </Paragraph>)}
                </Pane>
            </Pane>
        </Card>
    }
}

export default GroupCard;
