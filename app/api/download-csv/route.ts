import { NextResponse } from 'next/server';
import { Parser } from 'json2csv';

export async function POST(req: Request) {
  try {
    const { fields, excelData } = await req.json();

    if (!fields || !excelData) {
      return NextResponse.json(
        { error: 'Fields and data are required' },
        { status: 400 },
      );
    }

    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(excelData);

    const headers = new Headers({
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename=INVOICE.csv',
    });

    return new NextResponse(csv, { headers });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
