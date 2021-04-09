import React, { useContext, useEffect, useState } from 'react';
import { Col, List, Row, Typography, Card, Tag, Divider } from 'antd';
import { useHideMenu } from '../hooks/useHideMenu';
import { SocketContext } from '../context/SocketContext';
import { getUltimos } from '../helpers/getUltimos';

const { Title, Text } = Typography;

export const Cola = () => {

    useHideMenu(true);

    const { socket } = useContext(SocketContext);

    const [tickets, setTickets] = useState([]);

    useEffect(() => {

        socket.on('ticket-asignado', (tickets) => {
            setTickets(tickets);
        });

        return () => {
            socket.off('ticket-asignado');
        }

    }, [socket]);

    useEffect(() => {

        getUltimos().then(tickets => setTickets(tickets));

    }, []);

    return (
        <>
            <Title level={1}>Atendiendo al cliente</Title>
            <Row>
                <Col span={12}>
                    <List dataSource={tickets.slice(0, 3)}
                        renderItem={item => (
                            <List.Item>
                                <Card style={{ width: 300, marginTop: 16 }}>
                                    <Title>N° {item.numero}</Title>
                                    <Tag color="volcano">{item.agente}</Tag>
                                    <Tag color="magenta">Escritorio: {item.escritorio}</Tag>
                                </Card>
                            </List.Item>
                        )}>
                    </List>
                </Col>
                <Col span={12}>
                    <Divider>Historial</Divider>
                    <List dataSource={tickets.slice(3)}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={`Ticket N° ${item.numero}`}
                                    description={
                                        <>
                                            <Text type="secondary">En el escritorio: </Text>
                                            <Tag color="magenta">{item.escritorio}</Tag>
                                            <Text type="secondary">Agente: </Text>
                                            <Tag color="volcano">{item.agente}</Tag>
                                        </>
                                    }></List.Item.Meta>
                            </List.Item>
                        )}>
                    </List>
                </Col>
            </Row>
        </>
    )
}
