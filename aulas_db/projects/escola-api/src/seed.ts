import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { AlunosService } from './alunos/alunos.service.js';
import { faker } from '@faker-js/faker/locale/pt_BR';


async function bootstrap () {
    const app = await NestFactory.createApplicationContext( AppModule);
    const alunosService = app.get(AlunosService);

    console.log('=== Iniciando a geração de alunos Fakes ===');

    const cursos = [
        'Direito',
        'Medicina',
        'Ciência da Computação',
        'Fisioterapia',
        'Enfermagem',
        'Farmácia',
        'Geografia',
        'História',
        'Matemática',
        'Pedagogia',
        'Psicologia',
        'Engenharia Civil',
        'Ciências Ambientais',
        'Arquitetura e Urbanismo',
    ];

    for(let i = 0; i < 100; i++) {
        const cursosAleatorios = faker.helpers.arrayElements(
            cursos, {min: 1, max: 3}
        );
        const fakeAluno = {
            nome: faker.person.fullName(),
            idade: faker.number.int({
                min: 17,
                max: 99
            }),
            matricula: faker.string.numeric(5),
            cursos: cursosAleatorios,
            ativo: true,   
        };
        try {
            await alunosService.create(fakeAluno);
        } catch (error) {
            console.error(`Pular erro ao salvar ${fakeAluno.nome} - Matricula Duplicada`)
        }

    }
    console.log('Database populated with success');
    await app.close();
}
bootstrap();