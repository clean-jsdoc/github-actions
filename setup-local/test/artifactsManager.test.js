const chai = require('chai');
const sinon = require('sinon');
const { default: artifactClient } = require('@actions/artifact');
const core = require('@actions/core');
const ArtifactsManager = require('../src/artifactsManager');

const { expect } = chai;

describe('Artifacts Handling', () => {
  beforeEach(() => {
    sinon.stub(artifactClient, 'uploadArtifact').returns('Response');
    sinon.stub(core, 'info');
  });

  afterEach(() => {
    core.info.restore();
  });

  context('Upload Artifacts', () => {
    it('by specifying the file location', () => {
      const artifactName = 'RandomName';
      const files = ['/some/path/file'];
      const rootFolder = '/some/path';
      const options = {
        continueOnError: true,
      };

      return ArtifactsManager.uploadArtifacts(artifactName, files, rootFolder)
        .then((response) => {
          sinon.assert.calledWith(
            artifactClient.uploadArtifact,
            artifactName,
            files,
            rootFolder,
            options,
          );
          sinon.assert.called(core.info);
          expect(response).to.eql('Response');
        });
    });
  });
});
