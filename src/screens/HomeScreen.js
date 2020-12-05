import React, { useEffect, useState } from 'react';
import {Card, Form, Table} from 'react-bootstrap';
import {getCountries, getData} from  '../data/apiData';
import {ScaleLoader} from 'react-spinners';
import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


const HomeScreen = () => {
    const [countries, setCoutries] = useState([]);
    const [exporData, setExportData] = useState([]);
    const [loading, setLoading] = useState(false);

    const override =`
        display: flex;
        align-items: center;
        justify-content: center;    
        border-color: red;
    `;

    const DataSet = [
        {
            columns: [
                {title: "Province State", style: {font: {sz: "18", bold: true}}, width: {wpx: 125}}, // width in pixels
                {title: "Country Region", style: {font: {sz: "18", bold: true}}, width: {wch: 30}}, // width in characters
                {title: "Confirmed", style: {font: {sz: "18", bold: true}}, width: {wpx: 100}}, // width in pixels
                {title: "Deaths", style: {font: {sz: "18", bold: true}}, width: {wpx: 125}}, // width in pixels
                {title: "Recovered", style: {font: {sz: "18", bold: true}}, width: {wpx: 100}}, // width in pixels
                {title: "Active", style: {font: {sz: "18", bold: true}}, width: {wpx: 125}}, // width in pixels
                {title: "Incident Rate", style: {font: {sz: "18", bold: true}}, width: {wch: 30}}, // width in characters
                {title: "Latitude", style: {font: {sz: "18", bold: true}}, width: {wpx: 125}}, // width in pixels
                {title: "Longitude", style: {font: {sz: "18", bold: true}}, width: {wpx: 125}}, // width in pixels
                {title: "Last Update", style: {font: {sz: "18", bold: true}}, width: {wpx: 110}}, // width in pixels
                
            ],
            data: exporData.map((data) => [
                {value: data.provinceState, style: {font: {sz: "14"}}},
                {value: data.countryRegion, style: {font: {sz: "14"}}},
                {value: data.confirmed, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid", fgColor: {rgb: "3461eb"}}}},
                {value: data.deaths, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid", fgColor: {rgb: "eb1207"}}}},
                {value: data.recovered, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid", fgColor: {rgb: "4bd909"}}}},
                {value: data.active, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid", fgColor: {rgb: "ebc907"}}}},
                {value: data.incidentRate, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid", fgColor: {rgb: "35bdb4"}}}},
                {value: data.lat, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid", fgColor: {rgb: "ed14f5"}}}},
                {value: data.long, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid", fgColor: {rgb: "ed14f5"}}}},
                {value: data.lastUpdate, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid", fgColor: {rgb: "000000"}}}},
            ])
        }
    ]
    const getAllCountries = async () => {
        const data = await getCountries();
        setCoutries(data);
    }

    const countryChangeHandler = async (e) => {
        setExportData([]);
        setLoading(true);
        const data = await getData(e.target.value);
        console.log(data);
        setExportData(data);
        setLoading(false);
    }

    useEffect(() => {
        getAllCountries();
    }, []);
    return (
        <div className="container">
            <Card>
                <Card.Body>
                    <Card.Title>Excel Export</Card.Title>
                    <Form>
                        <Form.Label className="text-danger font-weight-bold">Select Country</Form.Label>
                        <Form.Control as="select" onChange={(e) => countryChangeHandler(e)} defaultValue="Choose.....">
                            {countries.map(
                                (country, i) => 
                                <option key={i} value={country.name}>
                                    {country.name}
                                </option>
                            )}
                        </Form.Control>
                    </Form>
                    {exporData.length !== 0 ? (
                         <ExcelFile 
                         filename="Covid-19 Data" 
                         element={<button type="button" className="btn btn-success float-right m-3">Export Data</button>}>
                             <ExcelSheet dataSet={DataSet} name="Covid-19 Country Report"/>
                         </ExcelFile>
                    ): null}                   
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Province State</th>
                                <th>Country Region</th>
                                <th>Confirmed</th>
                                <th>Deaths</th>
                                <th>Recovered</th>
                                <th>Active</th>
                                <th>Incident Rate</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Last Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exporData.length === 0 ? (
                                <tr>
                                    <td colSpan="10">
                                        <ScaleLoader 
                                        css={override}
                                        size={150}
                                        color={"#eb4034"}
                                        loading={loading}/>
                                    </td>
                                </tr>
                            ) : (
                                <>
                               {exporData.map((data) => (
                                   <tr key={data.uid}>
                                        <td>{data.provinceState}</td>
                                        <td>{data.countryRegion}</td>
                                        <td>{data.confirmed}</td>
                                        <td>{data.deaths}</td>
                                        <td>{data.recovered}</td>
                                        <td>{data.active}</td>
                                        <td>{data.incidentRate}</td>
                                        <td>{data.lat}</td>
                                        <td>{data.long}</td>
                                        <td>{data.lastUpdate}</td>
                                   </tr>
                               ))}
                                </>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
}

export default HomeScreen;