import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Question, Plus } from '../../resources';
import { Search, Capsule, MessageSummary } from '..';
import './style.css';

const Filters = [{
    text: 'All',
},
{
    text: 'New',
},
{
    text: 'Ongoing',
}, {
    text: 'Closed',
}];

const MessagesList = ({ activeMessage, updateActiveMessage }) => {
    const info = useSelector(state => state.info);
    const messages = info.messages;
    const unread = messages.filter(msg => msg.status === 'new');
    const unreadTickets = unread.filter(msg => msg.type === 'ticket');
    const unreadMessages = unread.filter(msg => msg.type === 'message');
    const [screenW, updateScreenW] = useState(window.innerWidth);
    const [activeTab, updateActiveTab] = useState('tickets');
    const [filter, updateFilter] = useState('All');
    const onWindowResize = (e) => {
        updateScreenW(e.target.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', onWindowResize);
        return function cleanup() {
            window.removeEventListener('resize', onWindowResize);
        }
    });
    return (
        <div className='flex flex-col flex-1 messages-list-container'>
            <Search />
            <div className='flex flex-row tab-container'>
                <div onClick={() => updateActiveTab('chats')} className={`flex flex-1 justify-center items-center tab ${activeTab === 'chats' ? 'active' : ''}`}>
                    <span className='flex'>Chat</span>
                    <span className={`flex w-4 h-4 justify-center items-center ml-3 tabs-badge ${activeTab === 'chats' ? 'active' : ''}`}>{unreadMessages.length}</span>
                </div>
                <div onClick={() => updateActiveTab('tickets')} className={`flex flex-1 justify-center items-center tab ${activeTab === 'tickets' ? 'active' : ''}`}>
                    <span className='flex'>Tickets</span>
                    <span className={`flex w-4 h-4 justify-center items-center ml-3 tabs-badge ${activeTab === 'tickets' ? 'active' : ''}`}>{unreadTickets.length}</span>
                </div>
                <div className='flex w-16 p-3 cursor-pointer justify-center items-center'>
                    <Question className='flex' />
                </div>
            </div>
            <div className='flex px-10 py-4 new-ticket-container'>
                <div className='flex justify-center items-center px-3 py-2 w-full rounded-md cursor-pointer new-ticket'>
                    <Plus />
                    <span className='flex ml-4'>{`${'Raise a new ticket'.substring(0, screenW <= 737 ? 5 : screenW <= 837 ? 8 : screenW <= 1000 ? 15 : 20)} ${screenW < 1050 && '...'}`}</span>
                </div>
            </div>
            <div className='flex flex-wrap justify-start items-center px-5 pb-3'>
                {Filters.map((f, i) => <Capsule key={i} _onClick={() => updateFilter(f.text)} text={f.text} active={filter === f.text} />)}
            </div>
            <div>
                {messages.map((message, i) => <MessageSummary kye={i} _onClick={() => updateActiveMessage(i)} key={i} message={message} active={activeMessage === i} />)}
            </div>
        </div>
    )
}

MessagesList.propTypes = {
    activeMessage: PropTypes.number,
    updateActiveMessage: PropTypes.func
}

export default MessagesList;
