FROM public.ecr.aws/lambda/nodejs:20

# Set working directory to /var/task
WORKDIR ${LAMBDA_TASK_ROOT}

COPY ./ ./

# Install production dependencies
# RUN --mount=type=cache,target=/root/.npm npm install --prefer-offline --no-audit --progress=false --fund false 

# Lambda function handler
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

CMD ["entry.handler"]