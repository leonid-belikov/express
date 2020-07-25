import React, {useState} from 'react';
import {Card, Pane, Heading, Paragraph, defaultTheme, Avatar, Icon, IconButton} from 'evergreen-ui'


const menuTopPositions = {
    default: 0,
    peeping: -32,
    outside: -62,
}

function InvitationCard(props) {

    const [menuTopCoord, setMenuTopCoord] = useState(menuTopPositions.default)

    const handleMouseEnterCard = () => {
        setMenuTopCoord(menuTopPositions.peeping)
    }

    const handleMouseEnterMenu = () => {
        setMenuTopCoord(menuTopPositions.outside)
    }

    const resetMenuCoord = () => {
        setMenuTopCoord(menuTopPositions.default)
    }

    const data = props.data;
    const cardBorderRadius = 10;

    return <Pane
        position='relative'
        marginTop={25}>
        <Pane
            position='relative'
            zIndex={999}>
            <Card
                key={data._id}
                elevation={3}
                width={350}
                borderRadius={cardBorderRadius}
                marginRight={25}
                onMouseEnter={handleMouseEnterCard}
                onMouseLeave={resetMenuCoord}>
                <Pane
                    position='relative'
                    paddingTop={24}
                    paddingBottom={16}
                    paddingX={25}
                    background={defaultTheme.palette.blue.light}
                    borderTopRightRadius={cardBorderRadius}
                    borderTopLeftRadius={cardBorderRadius}
                    whiteSpace='nowrap'
                    overflow='hidden'
                    textOverflow='ellipsis'>
                    <Heading
                        size={600}
                        color={defaultTheme.scales.neutral.N8}
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
                </Pane>
                <Pane
                    paddingTop={25}
                    paddingBottom={20}
                    paddingX={25}>
                    <Pane
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
                                    marginRight={6}
                                />
                            })}
                        </Pane>
                    </Pane>
                </Pane>
            </Card>
        </Pane>

        {!menuTopCoord && <Icon
            icon='chevron-up'
            position='absolute'
            right={100}
            zIndex={9999}
            color={defaultTheme.scales.neutral.N8}
            className='jump'
        />}

        <Pane
            transition='300ms'
            position='absolute'
            top={menuTopCoord}
            right={45}
            borderRadius={8}
            onMouseEnter={handleMouseEnterMenu}
            onMouseLeave={resetMenuCoord}>
            {menuTopCoord < menuTopPositions.default && <Pane
                display='flex'
                padding={24}
                height='100%'>
                    <IconButton
                        icon='tick'
                        appearance="primary"
                        intent="success"
                        marginRight={8}
                        onClick={props.acceptHandler}
                    />
                    <IconButton
                        icon='cross'
                        appearance="primary"
                        intent="danger"
                        onClick={props.declineHandler}
                    />
            </Pane>}
        </Pane>

    </Pane>
}

export default InvitationCard;
