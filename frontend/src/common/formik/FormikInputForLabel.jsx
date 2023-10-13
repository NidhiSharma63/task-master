import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  TextField,
  Typography,
} from '@mui/material';
import { Field } from 'formik';
import React, { useState } from 'react';
import { COLORS_FOR_PROJECTS } from 'src/constant/colors';
import colors from 'src/theme/variables';
import TitleCase from 'src/utils/TextTransformer';

const FormikInputForLabel = (props) => {
  const [isAccordianOpen, setIsAccodianOpen] = useState(false);
  const { colorName, name } = props;
  const [textValue, setTextValue] = useState('');

  const handleAccordian = () => {
    setIsAccodianOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mb: 3 }}>
      <Field name={name}>
        {({ field, form }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                mb: 2,
                width: '100%',
                flexDirection: 'column',
              }}
            >
              <Typography
                sx={{
                  maxWidth: '13rem',
                  mb: 1,
                }}
                variant="h6"
              >
                {TitleCase(name)}
              </Typography>
              <TextField
                {...field}
                value={textValue.length > 0 ? textValue : value}
                sx={{
                  width: '100%',
                  padding: 0,
                  borderColor: (theme) => theme.palette.grey[50],
                  borderRadius: '.3rem',
                  backgroundColor: 'white',
                }}
                onChange={(event) => {
                  setTextValue(event.target.value);
                  setFieldValue(name, event.target.value);
                }}
                outline="none"
              />
            </Box>
          );
        }}
      </Field>
      <Field name={colorName}>
        {({ form, field }) => {
          //   console.log(form, ":::form", field, ":::field");
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <>
              <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                {textValue.length > 0 && (
                  <Typography
                    sx={{
                      padding: '.4rem .7rem',
                      background: value,
                      color: 'white',
                      width: 'fit-content',
                      borderRadius: '1rem',
                      fontSize: '.8rem',
                    }}
                  >
                    {textValue}
                  </Typography>
                )}

                <Accordion
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: `${isAccordianOpen ? '22rem' : '4rem'}`,
                    background: 'transparent',
                    boxShadow: 'none',
                    border: `1px solid ${colors.lineColor}`,
                    borderRadius: '.3rem',
                    // height: '1rem',
                    backgroundColor: 'white',
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ArrowForwardIosSharpIcon />}
                    onClick={handleAccordian}
                  >
                    <Box
                      sx={{
                        width: '1.2rem',
                        height: '1.2rem',
                        borderRadius: '50%',
                        backgroundColor: value,
                        cursor: 'pointer',
                      }}
                    ></Box>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      display: 'flex',
                      flexDirection: 'row', // Display children horizontally
                      justifyContent: 'flex-start', // Align children to the start
                      gap: '8px',
                      alignItems: 'center',
                      mt: 1.5,
                    }}
                  >
                    {COLORS_FOR_PROJECTS.map((color) => {
                      return (
                        <Box
                          key={color}
                          sx={{
                            width: '1.2rem',
                            height: '1.2rem',
                            borderRadius: '50%',
                            backgroundColor: color,
                            cursor: 'pointer',
                            border: `${
                              color === value
                                ? `3px solid ${colors.lineColor}`
                                : 'none'
                            }`,
                          }}
                          onClick={() => {
                            setFieldValue(colorName, color);
                          }}
                        ></Box>
                      );
                    })}
                  </AccordionDetails>
                </Accordion>
              </Box>
            </>
          );
        }}
      </Field>
    </Box>
  );
};

export default FormikInputForLabel;
