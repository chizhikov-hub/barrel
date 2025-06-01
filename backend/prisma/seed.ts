import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const unitsData = [
    { code: 'шт.', name: 'Штука' },
    { code: 'мл.', name: 'Миллилитр' },
    { code: 'л.',  name: 'Литр' }
]

async function main() {
    // 1. Получаем все существующие коды
    const existingUnits = await prisma.unit.findMany({
        select: { code: true }
    })
    const existingCodes = existingUnits.map(unit => unit.code)

    // 2. Находим коды, которые нужно удалить (есть в БД, но нет в unitsData)
    const codesToDelete = existingCodes.filter(
        code => !unitsData.some(unit => unit.code === code)
    )

    // 3. Удаляем неиспользуемые единицы измерения
    if (codesToDelete.length > 0) {
        await prisma.unit.deleteMany({
            where: {
                code: { in: codesToDelete }
            }
        })
        console.log(`Удалено единиц измерения: ${codesToDelete.length}`)
    }

    // 4. Обновляем или создаем записи из unitsData
    // Используем Promise.all для параллельного выполнения операций
    await Promise.all(
        unitsData.map(unit =>
            prisma.unit.upsert({
                where: {
                    code: unit.code, // Предполагаем, что код уникальный
                },
                update: {
                    name: unit.name, // Обновляем только имя
                },
                create: {
                    code: unit.code,
                    name: unit.name,
                },
            })
        )
    )

    console.log('Seed выполнен успешно')
}

main()
    .catch((e) => {
        console.error('Ошибка при выполнении seed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })