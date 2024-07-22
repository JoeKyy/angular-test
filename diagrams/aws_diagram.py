from diagrams import Diagram, Cluster
from diagrams.aws.compute import Lambda
from diagrams.aws.database import Dynamodb
from diagrams.aws.network import APIGateway
from diagrams.aws.security import Cognito, IAM
from diagrams.aws.storage import S3
from diagrams.aws.network import CloudFront
from diagrams.aws.management import Cloudformation, Cloudwatch
from diagrams.onprem.client import Client

with Diagram("AWS Fullstack Application", show=False):
    client = Client("Client")

    with Cluster("Frontend"):
        s3 = S3("S3")
        cloudfront = CloudFront("CloudFront")
        client >> cloudfront >> s3

    with Cluster("Backend"):
        api_gw = APIGateway("API Gateway")

        with Cluster("Auth Service"):
            auth_lambda = Lambda("Auth Lambda")
            cognito = Cognito("AWS Cognito")
            auth_lambda >> cognito
            api_gw >> auth_lambda

        with Cluster("Charge Service"):
            charge_lambda = Lambda("Charge Lambda")
            dynamo_charge = Dynamodb("DynamoDB (Charge)")
            auth_lambda >> charge_lambda
            charge_lambda >> dynamo_charge
            api_gw >> charge_lambda

        with Cluster("Renegotiation Service"):
            renegotiation_lambda = Lambda("Renegotiation Lambda")
            dynamo_renegotiation = Dynamodb("DynamoDB (Renegotiation)")
            auth_lambda >> renegotiation_lambda
            renegotiation_lambda >> dynamo_renegotiation
            api_gw >> renegotiation_lambda

    cloudfront >> api_gw

    with Cluster("Infrastructure & Configuration"):
        cloudformation = Cloudformation("CloudFormation")
        iam = IAM("IAM")
        cloudwatch = Cloudwatch("CloudWatch")

        cloudformation >> [auth_lambda, charge_lambda, renegotiation_lambda]
        iam >> [auth_lambda, charge_lambda, renegotiation_lambda]
        cloudwatch >> [auth_lambda, charge_lambda, renegotiation_lambda]
