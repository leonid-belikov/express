import React, {Component} from 'react';
import {Card, Pane, Heading, Paragraph, defaultTheme, Icon, Avatar} from 'evergreen-ui'
import {ReactRough, Line} from "react-rough";

class InvitationCard extends Component {

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
                borderTopLeftRadius={cardBorderRadius}
                whiteSpace='nowrap'
                overflow='hidden'
                textOverflow='ellipsis'>
                <Heading
                    size={600}
                    color='white'
                    marginBottom={10}>
                    {data.name}
                </Heading>
                <Paragraph
                    size={400}
                    marginBottom={10}
                    color={defaultTheme.scales.neutral.N6}
                    whiteSpace='nowrap'
                    overflow='hidden'
                    textOverflow='ellipsis'>
                    {data.description}
                </Paragraph>
                <Pane
                    position='absolute'
                    bottom={-8}
                    left={0}>
                    <ReactRough
                        width={350}
                        height={20}>
                        <Line
                            x1={0}
                            x2={350}
                            y1={15}
                            y2={15}
                            stroke='white'
                            roughness={3}
                        />
                        <Line
                            x1={0}
                            x2={350}
                            y1={10}
                            y2={10}
                            stroke='white'
                            roughness={3}
                        />
                    </ReactRough>
                </Pane>
            </Pane>
            <Pane
                paddingTop={25}
                paddingBottom={20}
                paddingX={25}>
                <Pane
                    position='relative'
                    display='flex'
                    marginBottom={0}>
                    <Pane
                        flexGrow={1}>
                        {data.users.map(user => {
                            return <Avatar
                                isSolid
                                key={user._id}
                                name={user.name}
                                size={40}
                            />
                        })}
                    </Pane>
                </Pane>
            </Pane>
        </Card>
    }
}

export default InvitationCard;
