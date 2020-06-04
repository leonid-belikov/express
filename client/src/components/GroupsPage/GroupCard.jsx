import React, {Component} from 'react';
import {Card, Pane, Heading, Paragraph, defaultTheme, Icon, Avatar} from 'evergreen-ui'
import ReactRough, {Line} from "react-rough";

class GroupCard extends Component {

    render() {

        const data = this.props.data;
        const cardBorderRadius = 10;

        return <Card
            key={data._id}
            elevation={3}
            width={350}
            borderRadius={cardBorderRadius}
            marginRight={25}
            marginTop={25}>
            <Pane
                position='relative'
                paddingTop={24}
                paddingBottom={16}
                paddingX={25}
                background={defaultTheme.palette.neutral.dark}
                borderTopRightRadius={cardBorderRadius}
                borderTopLeftRadius={cardBorderRadius}>
                <Heading
                    size={600}
                    color='white'
                    marginBottom={10}>
                    {data.name}
                </Heading>
                <Paragraph
                    size={400}
                    marginBottom={10}
                    overflow='hidden'
                    color={defaultTheme.scales.neutral.N6}
                    textOverflow='ellipsis'>
                    {data.description}
                </Paragraph>
            </Pane>
            <Pane
                paddingTop={25}
                paddingBottom={20}
                paddingX={25}>
                <Pane
                    position='relative'
                    display='flex'
                    paddingBottom={25}
                    marginBottom={30}>
                    <Pane
                        flexGrow={1}
                        marginRight={20}>
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
                                size={40}
                                marginRight={6}
                            />
                        })}
                    </Pane>
                    {!!data.invited.length && <Pane
                        flexGrow={1}>
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
                                size={40}
                            />
                        })}
                    </Pane>}
                    <Pane
                        position='absolute'
                        bottom={-10}
                        left={0}>
                        <ReactRough
                            width={300}
                            height={10}>
                            <Line
                                x1={0}
                                x2={300}
                                y1={5}
                                y2={5}
                                stroke={defaultTheme.colors.border.default}
                                roughness={0.5}
                                strokeLineDash={[5,13]}
                            />
                        </ReactRough>
                    </Pane>
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
