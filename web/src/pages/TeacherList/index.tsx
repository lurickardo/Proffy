import React, { useState, FormEvent } from 'react';

import PageHearder from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Input';
import Select from '../../components/select';
import api from '../../services/api';

import './styles.css';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) { 
        e.preventDefault();

        const response = await api.get('/classes', { 
            params: {
                subject, 
                week_day, 
                time
            }
        });

        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHearder title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={(e) => {
                            setSubject(e.target.value)
                        }}
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Ciencias', label: 'Ciencias' },
                            { value: 'Ed Fisica', label: 'Ed Fisica' },
                            { value: 'Portugues', label: 'Matematica' },
                            { value: 'Historia', label: 'Historia' },
                            { value: 'Geografia', label: 'Geografia' },
                            { value: 'Quimica', label: 'Quimica' },
                            { value: 'Fisica', label: 'Fisica' },
                            { value: 'Inglês', label: 'Inglês' },
                        ]} />

                    <Select
                        name="week_day"
                        label="Dia da semana"
                        value={week_day}
                        onChange={(e) => {
                            setWeekDay(e.target.value)
                        }}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sexta-feira' },
                            { value: '6', label: 'Sabado' },
                        ]} />

                    <Input type="time" name="time" label="Hora" value={time}
                    onChange={(e) => {
                        setTime(e.target.value)
                    }} />

                    <button type="submit">Buscar</button>
                </form>
            </PageHearder>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher}/>
                })}
            </main>
        </div>
    )
}

export default TeacherList;