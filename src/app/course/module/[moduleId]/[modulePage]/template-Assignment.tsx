import React from 'react';
import styles from './Assignment.module.css';
import { TemplateProps } from './common';

const AssignmentTemplate = ({
  frontmatter,
  moduleId,
  page,
  children,
}: TemplateProps) => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.assignmentContainer}>
        <h2>{frontmatter.title}</h2>
        <h1>{frontmatter.description}</h1>
        {children}
        <div>
          <h2>Placeholders:</h2>
          <p>{moduleId}</p>
          <p>{JSON.stringify(page)}</p>
        </div>
      </div>
    </div>
  );
};

export default AssignmentTemplate;
