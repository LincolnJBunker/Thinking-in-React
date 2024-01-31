import './InvoiceTable.css';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import AddButton from './AddButton';

function InvoiceTable({ initialData }) {

    //loop through initial data and return a <TableRow/> component for each invoice objecet in the array
    const rows = initialData.map((invoice) => {
        //destructure the array
        const { id, description, hours, rate } = invoice;

        return (
            <TableRow
                key={id}
                initialIsEditing={false}
                initialInvoiceData={{ description, rate, hours }}
                />
        )
    });

  return (
    <div>
        <table>
            <thead>
                <TableHeader />
            </thead>

            <tbody>
                {rows}
            </tbody>

            <tfoot>
                <AddButton />
            </tfoot>
        </table>
    </div>
  )
}

export default InvoiceTable